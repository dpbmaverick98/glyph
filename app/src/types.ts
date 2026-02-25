export interface DocItem {
  label: string;
  slug: string;
  file: string;
  badge?: string;
}

export interface SidebarGroup {
  group: string;
  items: DocItem[];
}

export interface DocsConfig {
  name: string;
  description: string;
  sidebar: SidebarGroup[];
  nav: {
    links: { label: string; href: string }[];
    social: { discord: string; twitter: string; github: string };
  };
}

export interface DocContent {
  title: string;
  description: string;
  content: string;
  sidebar_position?: number;
  status?: string;
}
