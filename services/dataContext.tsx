import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, BlogPost, NewsItem } from '../types';
import { INITIAL_MEMBERS, INITIAL_BLOG_POSTS, INITIAL_NEWS } from '../constants';

interface DataContextType {
  members: Member[];
  blogPosts: BlogPost[];
  newsItems: NewsItem[];
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  removeBlogPost: (id: string) => void;
  addNewsItem: (item: NewsItem) => void;
  removeNewsItem: (id: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPass: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123'); // Default password

  const addMember = (member: Member) => setMembers(prev => [...prev, member]);
  const removeMember = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [post, ...prev]);
  const removeBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const addNewsItem = (item: NewsItem) => setNewsItems(prev => [item, ...prev]);
  const removeNewsItem = (id: string) => setNewsItems(prev => prev.filter(n => n.id !== id));

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
      members, blogPosts, newsItems,
      addMember, removeMember,
      addBlogPost, removeBlogPost,
      addNewsItem, removeNewsItem,
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