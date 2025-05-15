import Image from 'next/image';
import Link from 'next/link';
import ChartComponent from './ChartComponent';

const components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-night-navy">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-8 mb-4 text-night-navy">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-night-navy">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold mt-6 mb-3 text-night-navy">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-night-navy/90 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link href={href} className="text-sky-cyan hover:underline">
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="my-4 pl-6 list-disc text-night-navy/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 pl-6 list-decimal text-night-navy/90">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="my-2">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="pl-4 border-l-4 border-sky-cyan italic my-6 text-graphite">
      {children}
    </blockquote>
  ),
  img: ({ src, alt, width, height }) => (
    <div className="my-6">
      <Image
        src={src}
        alt={alt || ""}
        width={width || 800}
        height={height || 450}
        className="rounded-lg"
      />
    </div>
  ),
  Chart: ChartComponent,
  // Add more custom components here
};

export default components;