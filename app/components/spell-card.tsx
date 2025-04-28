"use client";

import { useState, useEffect } from 'react';
import { Page, Text, Document, StyleSheet, PDFViewer, View } from '@react-pdf/renderer';
import type { SpellComponent } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  componentList: {
    marginLeft: 20,
  },
});

interface SpellCardProps {
  name: string;
  components: SpellComponent[];
  directions: string;
  words: string;
}

function SpellPDF({ name, components, directions, words }: SpellCardProps) {
  return (
    <Document title={name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Components</Text>
          {components.map((component, index) => (
            <Text key={index} style={[styles.text, styles.componentList]}>
              • {component.type === 'crystal' ? '💎' : '🌿'} {component.name}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Directions</Text>
          <Text style={styles.text}>{directions}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Words of Power</Text>
          <Text style={styles.text}>{words}</Text>
        </View>
      </Page>
    </Document>
  );
}

export function SpellCard(props: SpellCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Loading spell card...</div>
      </div>
    );
  }

  const fileName = `${props.name.toLowerCase().replace(/\s+/g, '-')}-spell.pdf`;

  return (
    <div className="w-full h-[600px]">
      <PDFViewer className="w-full h-full" fileName={fileName}>
        <SpellPDF {...props} />
      </PDFViewer>
    </div>
  );
}