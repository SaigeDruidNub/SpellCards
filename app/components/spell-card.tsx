"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { SpellComponent } from '../types';

interface SpellCardProps {
  name: string;
  components: SpellComponent[];
  directions: string;
  words: string;
}

export function SpellCard(props: SpellCardProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    const spellText = `
Spell: ${props.name}

Components:
${props.components.map(c => `- ${c.type === 'crystal' ? '💎' : '🌿'} ${c.name}`).join('\n')}

Directions:
${props.directions}

Words of Power:
"${props.words}"
    `;
    
    navigator.clipboard.writeText(spellText).then(() => {
      toast({
        title: "Copied!",
        description: "Spell details copied to clipboard",
      });
    });
  };

  // Fixed email sending function - only parse response once
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSending(true);
      
      const response = await fetch('/api/send-spell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          spell: {
            name: props.name,
            components: props.components,
            directions: props.directions,
            words: props.words,
          },
        }),
      });
      
      // Only parse response JSON once
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      
      toast({
        title: "Success!",
        description: "Your spell has been sent to your email.",
      });
      setEmail('');
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{props.name}</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Components</h3>
        <ul className="list-disc pl-5 space-y-1">
          {props.components.map((component, index) => (
            <li key={index} className="text-sm">
              {component.type === 'crystal' ? '💎' : '🌿'} {component.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Directions</h3>
        <p className="text-sm">{props.directions}</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Words of Power</h3>
        <p className="text-sm italic">{props.words}</p>
      </div>
      
      <div className="border-t pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Save this spell
            </label>
            
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={isSending}
                />
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Email"}
                </Button>
              </div>
              
              
            </div>
            <label className="text-sm text-muted-foreground">
              By sending this email, you agree to receive future updates and offers from Koi Designs.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}