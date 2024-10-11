'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ArticlePage() {
  const params = useParams();
  const { slug } = params;

  // In a real application, you would fetch the article content based on the slug
  const getArticleContent = (slug: string) => {
    // This is a placeholder. In a real app, you'd fetch this data from an API or database
    return {
      title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      content: `This is the content for the article about ${slug.split('-').join(' ')}. In a real application, this would be much longer and more detailed.`
    };
  };

  const article = getArticleContent(slug as string);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.article 
          className="bg-card p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="prose max-w-none text-muted-foreground">
            <p>{article.content}</p>
          </div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}