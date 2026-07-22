import { ArrowUpRight } from 'lucide-react';

export const ProjectItem = ({ title, description, tags, link, banner, bannerLight, bannerDark, image, index }) => {
  let lightSrc = null;
  let darkSrc = null;

  if (typeof banner === 'object' && banner !== null) {
    lightSrc = banner.light || null;
    darkSrc = banner.dark || null;
  } else if (bannerLight || bannerDark) {
    lightSrc = bannerLight || banner || image;
    darkSrc = bannerDark || banner || image;
  } else {
    lightSrc = banner || image || null;
    darkSrc = banner || image || null;
  }

  const hasBanner = Boolean(lightSrc || darkSrc);
  const isDualBanner = Boolean(lightSrc && darkSrc && lightSrc !== darkSrc);

  const tagList = Array.isArray(tags) 
    ? tags 
    : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card flex flex-col gap-4 w-full h-full p-5 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 transition-all duration-300 ease-out hover:bg-white/80 dark:hover:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/20 hover:-translate-y-1 group-hover:opacity-50 hover:!opacity-100 opacity-0 animate-[slideInUp_0.6s_ease-out_forwards] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {hasBanner && (
        <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-200/40 dark:border-zinc-800/40 shrink-0">
          {isDualBanner ? (
            <>
              <img 
                src={lightSrc} 
                alt={title} 
                className="block dark:hidden w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
              />
              <img 
                src={darkSrc} 
                alt={title} 
                className="hidden dark:block w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
              />
            </>
          ) : (
            <img 
              src={lightSrc || darkSrc} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
            />
          )}
        </div>
      )}

      <div className="flex-1 space-y-2">
        <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-2">
          <span className="group-hover/card:text-zinc-900 dark:group-hover/card:text-white transition-colors duration-200">
            {title}
          </span>
          <ArrowUpRight 
            size={18} 
            className="text-zinc-400 dark:text-zinc-500 shrink-0 opacity-40 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:text-zinc-900 dark:group-hover/card:text-zinc-100" 
          />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal transition-colors duration-300 group-hover/card:text-zinc-700 dark:group-hover/card:text-zinc-300">
          {description}
        </p>
      </div>

      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
          {tagList.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-300/40 dark:border-zinc-700/40 backdrop-blur-xs transition-colors duration-200 group-hover/card:border-zinc-300 dark:group-hover/card:border-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
};