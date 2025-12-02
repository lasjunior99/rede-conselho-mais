
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, BlogPost, NewsItem, MetaConfig, Metric } from '../types';
import { INITIAL_MEMBERS, INITIAL_BLOG_POSTS, INITIAL_NEWS, DEFAULT_META_TAGS, INITIAL_METRICS } from '../constants';

interface DataContextType {
  members: Member[];
  blogPosts: BlogPost[];
  newsItems: NewsItem[];
  metaTags: MetaConfig;
  metrics: Metric[];
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  removeBlogPost: (id: string) => void;
  addNewsItem: (item: NewsItem) => void;
  removeNewsItem: (id: string) => void;
  updateMetaTags: (newTags: MetaConfig) => void;
  addMetric: (metric: Metric) => void;
  removeMetric: (id: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPass: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or fallback to constants
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('newsItems');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [metaTags, setMetaConfig] = useState<MetaConfig>(() => {
    const saved = localStorage.getItem('metaTags');
    return saved ? JSON.parse(saved) : DEFAULT_META_TAGS;
  });

  const [metrics, setMetrics] = useState<Metric[]>(() => {
    const saved = localStorage.getItem('metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Persistence Effects
  useEffect(() => localStorage.setItem('members', JSON.stringify(members)), [members]);
  useEffect(() => localStorage.setItem('blogPosts', JSON.stringify(blogPosts)), [blogPosts]);
  useEffect(() => localStorage.setItem('newsItems', JSON.stringify(newsItems)), [newsItems]);
  useEffect(() => localStorage.setItem('metaTags', JSON.stringify(metaTags)), [metaTags]);
  useEffect(() => localStorage.setItem('metrics', JSON.stringify(metrics)), [metrics]);

  const addMember = (member: Member) => setMembers(prev => [...prev, member]);
  const removeMember = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [post, ...prev]);
  const removeBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const addNewsItem = (item: NewsItem) => setNewsItems(prev => [item, ...prev]);
  const removeNewsItem = (id: string) => setNewsItems(prev => prev.filter(n => n.id !== id));

  const updateMetaTags = (newTags: MetaConfig) => setMetaConfig(newTags);

  const addMetric = (metric: Metric) => setMetrics(prev => [...prev, metric]);
  const removeMetric = (id: string) => setMetrics(prev => prev.filter(m => m.id !== id));

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);
  
  const changePassword = (newPass: string) => setAdminPassword(newPass);

  return (
    <DataContext.Provider value={{
      members, blogPosts, newsItems, metaTags, metrics,
      addMember, removeMember,
      addBlogPost, removeBlogPost,
      addNewsItem, removeNewsItem,
      updateMetaTags,
      addMetric, removeMetric,
      isAdmin, login, logout, changePassword
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
