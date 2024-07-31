import { createDomain } from 'effector';
import { createGate } from 'effector-react';

export interface PageItem {
  page_id: string | null;
  firm_id: string | null;
  page_category_id: string | null;
  user_id: string | null;
  url: string | null;
  oai_value: string | null;
  createdTs: string | null;
}

export interface BlockItem {
  page_block_id: string | null;
  page_id: string | null;
  page_block_type_id: string | null;
  page_block_order: string | null;
}

export interface SectionItem {
  page_block_section_id: string | null;
  page_block_id: string | null;
  page_block_section_order: string | null;
  title: string | null;
  subtitle: string | null;
  text: string | null;
  url: string | null;
}

export interface Page {
  page: PageItem;
  blocks: BlockItem[];
  sections: SectionItem[];
}

export interface PageQueryResult {
  status: string;
  data: {
    page: PageItem;
    blocks: BlockItem[];
    sections: SectionItem[];
  };
}

export const pagesD = createDomain('pages');
export const PagesGate = createGate<{ typeId: string }>('pagesGate');
