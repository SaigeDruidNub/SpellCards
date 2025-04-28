"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flower, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { herbs } from "../data/herbs";

export default function Herbs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Herb Directory</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {herbs.map((herb) => (
            <Card key={herb.name} className="overflow-hidden backdrop-blur-sm bg-card/50">
              <div className="relative h-48">
                <Image
                  src={herb.image}
                  alt={herb.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {herb.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{herb.description}</p>
                <div className="flex flex-wrap gap-2">
                  {herb.properties.map((property) => (
                    <Badge key={property.name} variant="secondary">
                      {property.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}