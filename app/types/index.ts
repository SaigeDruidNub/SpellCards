export type Property = {
  name: string;
};

export type Crystal = {
  name: string;
  description: string;
  properties: Property[];
  image: string;
};

export type Herb = {
  name: string;
  description: string;
  properties: Property[];
  image: string;
};

export type SpellComponent = {
  name: string;
  type: 'crystal' | 'herb';
};

export const properties = [
{ name: "abundance"},
{ name: "air"},
{ name: "ancestral connection"},
{ name: "balancing"},
{ name: "calming"},
{ name: "clarity"},
{ name: "cleansing"},
{ name: "communication"},
{ name: "confidence"},
{ name: "creativity"},
{ name: "decisiveness"},
{ name: "determination"},
{ name: "dreaming"},
{ name: "earth"},
{ name: "emotion"},
{ name: "energizing"},
{ name: "fertility"},
{ name: "fire"},
{ name: "flexibility"},
{ name: "flow"},
{ name: "focus"},
{ name: "grounding"},
{ name: "happiness"},
{ name: "harmony"},
{ name: "healing"},
{ name: "honesty"},
{ name: "hope"},
{ name: "inspiration"},
{ name: "intuition"},
{ name: "joy"},
{ name: "love"},
{ name: "loyalty"},
{ name: "mood"},
{ name: "new beginnings"},
{ name: "nurturing"},
{ name: "optimism"},
{ name: "passion"},
{ name: "peace"},
{ name: "perception"},
{ name: "positivity"},
{ name: "prosperity"},
{ name: "protection"},
{ name: "purification"},
{ name: "recall"},
{ name: "relaxation"},
{ name: "release"},
{ name: "release negativity"},
{ name: "restful sleep"},
{ name: "security"},
{ name: "self esteem"},
{ name: "serenity"},
{ name: "soothing"},
{ name: "stability"},
{ name: "stabilizing"},
{ name: "strength"},
{ name: "stress relief"},
{ name: "support"},
{ name: "transformation"},
{ name: "water"},
{ name: "wellness"}
] as const;