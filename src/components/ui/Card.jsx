import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  date,
  tags,
  href,
  className = '',
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Card Image */}
      {imageSrc && (
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-sky-cyan/10 text-sky-cyan px-2 py-1 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">
          {href ? (
            <Link href={href} className="hover:text-sky-cyan transition-colors">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {/* Date */}
        {date && (
          <p className="text-graphite text-sm mb-3">{formatDate(date)}</p>
        )}

        {/* Description */}
        {description && <p className="text-night-navy/80">{description}</p>}

        {/* Read More Link */}
        {href && (
          <div className="mt-4">
            <Link
              href={href}
              className="text-sky-cyan font-medium hover:underline inline-flex items-center"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}