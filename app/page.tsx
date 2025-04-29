"use client";

import { useState } from "react";
import { Search, Sparkles, Plus, X, Mail, Download } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { properties } from "./types";
import { crystals } from "./data/crystals";
import { herbs } from "./data/herbs";
import { SpellCard } from "./components/spell-card";
import type { SpellComponent } from "./types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [spellName, setSpellName] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [searchResults, setSearchResults] = useState<{ crystals: string[], herbs: string[] }>({ crystals: [], herbs: [] });
  const [spellComponents, setSpellComponents] = useState<SpellComponent[]>([]);
  const [directions, setDirections] = useState("");
  const [words, setWords] = useState("");
  const [showSpellCard, setShowSpellCard] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const { toast } = useToast();

  const handlePropertySearch = (property: string) => {
    const matchingCrystals = crystals
      .filter(crystal => crystal.properties.some(p => p.name === property))
      .map(crystal => crystal.name);
    
    const matchingHerbs = herbs
      .filter(herb => herb.properties.some(p => p.name === property))
      .map(herb => herb.name);

    setSearchResults({ crystals: matchingCrystals, herbs: matchingHerbs });
    setSelectedProperty(property);
  };

  const addComponentFromSearch = (name: string, type: 'crystal' | 'herb') => {
    if (!spellComponents.some(comp => comp.name === name && comp.type === type)) {
      setSpellComponents([...spellComponents, { name, type }]);
    }
  };

  const removeComponent = (index: number) => {
    setSpellComponents(spellComponents.filter((_, i) => i !== index));
  };

  const handleCreateSpell = () => {
    setShowSpellCard(true);
  };

  const handleEmailSpell = async () => {
    try {
      const response = await fetch('/api/send-spell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: recipientEmail,
          spell: {
            name: spellName,
            components: spellComponents,
            directions,
            words,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setRecipientEmail('');
      alert('Spell sent successfully!');
    } catch (error) {
      console.error('Error sending spell:', error);
      alert('Failed to send spell. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Spell Kit Creator</h1>
          <p className="text-muted-foreground">Create your spells and explore the properties of crystals and herbs</p>
          
          <nav className="flex justify-center gap-4">
            <Link href="/crystals">
              <Button variant="outline">Crystal Directory</Button>
            </Link>
            <Link href="/herbs">
              <Button variant="outline">Herb Directory</Button>
            </Link>
          </nav>
        </div>

        <Card className="backdrop-blur-sm bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search by Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={handlePropertySearch}>
              <SelectTrigger>
                <SelectValue placeholder="Select a property..." />
              </SelectTrigger>
              <SelectContent>
                {properties.map(property => (
                  <SelectItem key={property.name} value={property.name}>
                    {property.name.charAt(0).toUpperCase() + property.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {searchResults.crystals.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Matching Crystals:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchResults.crystals.map(crystal => (
                    <Badge 
                      key={crystal}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => addComponentFromSearch(crystal, 'crystal')}
                    >
                      💎 {crystal}
                      <Plus className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {searchResults.herbs.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Matching Herbs:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchResults.herbs.map(herb => (
                    <Badge 
                      key={herb}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => addComponentFromSearch(herb, 'herb')}
                    >
                      🌿 {herb}
                      <Plus className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Spell Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Spell Name</label>
              <Input
                placeholder="Enter spell name..."
                value={spellName}
                onChange={(e) => setSpellName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Components</label>
              <p className="text-sm text-muted-foreground">Search for components by property above and click to add them to your spell.</p>
              <div className="flex flex-wrap gap-2">
                {spellComponents.map((component, index) => (
                  <Badge 
                    key={`${component.name}-${index}`} 
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    {component.type === 'crystal' ? '💎' : '🌿'} {component.name}
                    <button
                      onClick={() => removeComponent(index)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Directions</label>
              <Textarea
                placeholder="Enter the steps to perform this spell..."
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Words of Power</label>
              <Textarea
                placeholder="Enter the words to be spoken..."
                value={words}
                onChange={(e) => setWords(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <Button className="flex-1" onClick={handleCreateSpell}>
                <Sparkles className="w-4 h-4 mr-2" />
                Create Spell Card
              </Button>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showSpellCard} onOpenChange={setShowSpellCard}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Your Spell Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SpellCard
                name={spellName}
                components={spellComponents}
                directions={directions}
                words={words}
              />
              
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}