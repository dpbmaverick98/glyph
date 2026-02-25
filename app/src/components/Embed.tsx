interface EmbedProps {
  src: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function Embed({ src, title, aspectRatio = '16:9' }: EmbedProps) {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isLoom = src.includes('loom.com');
  
  let embedUrl = src;
  
  // Convert YouTube watch URL to embed URL
  if (isYouTube) {
    const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Convert Loom share URL to embed URL
  if (isLoom) {
    const videoId = src.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)?.[1];
    if (videoId) {
      embedUrl = `https://www.loom.com/embed/${videoId}`;
    }
  }
  
  return (
    <div className={`my-6 rounded-xl overflow-hidden border border-border ${aspectRatioClasses[aspectRatio]}`}>
      <iframe
        src={embedUrl}
        title={title || 'Embedded content'}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
