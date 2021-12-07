export interface JobItem {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export interface Action {
  type: 'filter-add' | 'clear' | 'filter-remove' | 'init';
  payload?: any;
}
