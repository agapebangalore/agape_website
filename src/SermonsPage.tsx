import React, { useEffect, useState } from 'react';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const YOUTUBE_API_KEY = 'AIzaSyCwLstOa6u5rnlN3R1xGhqdxVgszFRRdQo';
const CHANNEL_ID = 'UCvn-_SocyaB-XHL-VROM4eQ'; // Correct Agape Bangalore YouTube Channel ID

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

// Playlist IDs for special groupings
const PLAYLISTS = {
  REVELATION_BIBLE_STUDY: 'PLLIRZZSu7zcpV7fZC-tjuoEZN9NQS2Xn2',
  ARCHBISHOP_PRACTICAL: 'PLLIRZZSu7zcrbJtimqqn8s05QqxQ3J0cv',
  TRUTH_OF_REDEMPTION: 'PLLIRZZSu7zcrqpcbHzGtDEwUY-rS09eaL',
  DR_JIM_REUBEN_ELLIOT: 'PLLIRZZSu7zcqQoxLlcb9JWpenApbRCXwB',
};

// Helper to fetch all video details for a playlist
async function fetchPlaylistVideos(playlistId: string): Promise<(Video & { _group?: string })[]> {
  const videos: (Video & { _group?: string })[] = [];
  let nextPageToken = '';
  const page = 1;
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}` + (nextPageToken ? `&pageToken=${nextPageToken}` : '');
    const res = await fetch(url);
    const data = await res.json();
    videos.push(...(data.items || []).map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
    })));
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  return videos;
}

// Helper to fetch video details for a list of IDs (max 50 per request)
async function fetchVideosByIds(ids: string[]): Promise<(Video & { _group?: string })[]> {
  const result: (Video & { _group?: string })[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${batch.join(',')}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    result.push(...(data.items || []).map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
    })));
  }
  return result;
}

// Add PodcastEpisodes component
const SPOTIFY_SHOW_ID = '45oJua9cpBUCHKeh2WoZMH';
const SPOTIFY_API_URL = `https://spotify-podcast-api.vercel.app/api/shows/${SPOTIFY_SHOW_ID}`;

const PodcastEpisodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      setError(null);
      try {
        // Use a public proxy API for Spotify podcast data (or replace with your own backend if needed)
        const res = await fetch(SPOTIFY_API_URL);
        const data = await res.json();
        setEpisodes(data.episodes || []);
      } catch (err: any) {
        setError('Failed to load podcast episodes.');
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodes();
  }, []);

  if (loading) return <div className="text-center">Loading podcast episodes…</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!episodes.length) return <div className="text-center">No podcast episodes found.</div>;

  return (
    <section className="mb-16 mt-12">
      <h2 className="text-foreground text-2xl md:text-3xl font-bold font-serif mb-8 flex items-center gap-2">
        All Podcast Episodes
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {episodes.map((ep) => (
          <div key={ep.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-md">
            <h3 className="text-foreground text-lg font-semibold mb-2">{ep.name}</h3>
            <p className="text-foreground text-sm text-[oklch(0.18_0_0)] mb-2">
              {ep.release_date} &bull; {Math.floor(ep.duration_ms / 60000)} min
            </p>
            <iframe
              src={`https://open.spotify.com/embed/episode/${ep.id}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg mb-2"
              title={ep.name}
            ></iframe>
            <p className="text-foreground text-sm text-[oklch(0.18_0_0)] line-clamp-3">{ep.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SermonsPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Helper to scroll to section on homepage
  const goToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      window.location.hash = sectionId;
    }, 0);
  };

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        // Step 1: Get uploads playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelRes.json();
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylistId) {
          throw new Error('Uploads playlist not found. API response: ' + JSON.stringify(channelData));
        }

        // Step 2: Fetch videos from uploads playlist
        const uploadsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
        );
        const uploadsData = await uploadsRes.json();
        const uploads: (Video & { _group?: string })[] = (uploadsData.items || []).map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.medium?.url || '',
          publishedAt: item.snippet.publishedAt,
        }));

        // Fetch custom playlists
        const [revelation, archbishop, truthRedemption, drJim] = await Promise.all([
          fetchPlaylistVideos(PLAYLISTS.REVELATION_BIBLE_STUDY),
          fetchPlaylistVideos(PLAYLISTS.ARCHBISHOP_PRACTICAL),
          fetchPlaylistVideos(PLAYLISTS.TRUTH_OF_REDEMPTION),
          fetchPlaylistVideos(PLAYLISTS.DR_JIM_REUBEN_ELLIOT),
        ]);

        // Tag custom playlist videos
        revelation.forEach(v => v._group = 'Revelation Bible Study');
        archbishop.forEach(v => v._group = "Arch Bishop Reuben M. Sathiyaraj's Practical Teaching Sermons");
        truthRedemption.forEach(v => v._group = 'Truth of Redemption - Bible Study Series');
        drJim.forEach(v => v._group = "Dr. Jim Reuben Elliot's Sermon");

        // Merge all videos, deduplicate by ID (custom playlists take precedence)
        const allVideosMap: { [id: string]: Video & { _group?: string } } = {};
        [...revelation, ...archbishop, ...truthRedemption, ...drJim, ...uploads].forEach(v => {
          allVideosMap[v.id] = v._group ? v : { ...v, _group: v._group };
        });
        const allVideos = Object.values(allVideosMap);
        // Sort videos by publishedAt (newest first)
        allVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setVideos(allVideos);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  // Helper: infer group from title/description
  function getVideoGroup(video: Video): string {
    const text = (video.title + ' ' + video.description).toLowerCase();
    if (/song|worship|music|hymn|choir|praise|sing/.test(text)) return 'Songs & Worship';
    if (/testimony|story|witness|miracle|deliverance/.test(text)) return 'Testimonies & Miracles';
    if (/healing|heal|miracle|deliverance|restoration/.test(text)) return 'Healing & Miracles';
    if (/bible study|study|teaching|lesson|class|discipleship/.test(text)) return 'Bible Study & Teaching';
    if (/sermon|message|preach|homily|exhort|word|gospel|service/.test(text)) return 'Sermons & Messages';
    return 'Other';
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to Content Link (for accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Skip to main content
      </a>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50" aria-label="Main Navigation">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => goToSection('hero')}
              className="flex items-center space-x-2 font-serif text-xl font-medium hover:text-primary transition-colors"
              aria-label="Go to home"
            >
              <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 object-contain" />
              <span>AGAPE BIBLE CHURCH</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => goToSection('about')} className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">About</button>
              <button onClick={() => goToSection('vision')} className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Vision</button>
              <button onClick={() => goToSection('pastor')} className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Pastor</button>
              <Link to="/sermons" className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Sermons</Link>
              <button onClick={() => goToSection('ministry')} className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Ministry</button>
              <button onClick={() => goToSection('contact')} className="text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              <div className="space-y-2">
                <button onClick={() => { setMobileMenuOpen(false); goToSection('about'); }} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">About</button>
                <button onClick={() => { setMobileMenuOpen(false); goToSection('vision'); }} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Vision</button>
                <button onClick={() => { setMobileMenuOpen(false); goToSection('pastor'); }} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Pastor</button>
                <Link to="/sermons" className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]" onClick={() => setMobileMenuOpen(false)}>Sermons</Link>
                <button onClick={() => { setMobileMenuOpen(false); goToSection('ministry'); }} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Ministry</button>
                <button onClick={() => { setMobileMenuOpen(false); goToSection('contact'); }} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-[oklch(0.18_0_0)]">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed nav */}

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 mb-12 shadow-md">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          {/* Main Page Title */}
          <h1 className="text-foreground text-4xl md:text-5xl font-serif font-bold mb-2 tracking-tight">Sermons & Messages</h1>
          <p className="text-foreground text-lg md:text-xl font-light max-w-2xl mx-auto mb-4">
            Watch, learn, and grow in faith with our latest sermons and biblical messages. Stream directly or watch on YouTube. New messages are added regularly!
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.youtube.com/@AgapeBangalore" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2 rounded-full bg-primary-foreground text-primary font-semibold shadow hover:bg-primary-foreground/90 transition-colors">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Visit YouTube Channel
            </a>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search sermons by title or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary"
            aria-label="Search sermons"
          />
        </div>
        {loading && <div className="text-center">Loading sermons…</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {/* Grouped by theme/type */}
        {(() => {
          // Filter out private videos and apply search
          const filtered = videos.filter(video => {
            const isPrivate = video.title.toLowerCase() === 'private video' || video.description.toLowerCase().includes('this video is private');
            if (isPrivate) return false;
            return (
              video.title.toLowerCase().includes(search.toLowerCase()) ||
              video.description.toLowerCase().includes(search.toLowerCase())
            );
          });
          // Group videos (priority: explicit group, else smart group)
          const groups: { [group: string]: Video[] } = {};
          filtered.forEach(video => {
            const group = (video as any)._group || getVideoGroup(video);
            if (!groups[group]) groups[group] = [];
            groups[group].push(video);
          });
          const groupOrder = [
            'Revelation Bible Study',
            'Truth of Redemption - Bible Study Series',
            "Arch Bishop Reuben M. Sathiyaraj's Practical Teaching Sermons",
            "Dr. Jim Reuben Elliot's Sermon",
            'Sermons & Messages',
            'Songs & Worship',
            'Bible Study & Teaching',
            'Testimonies & Miracles',
            'Healing & Miracles',
            'Other',
          ];
          return <>
            {groupOrder.filter(g => groups[g] && groups[g].length).map(group => {
              // Pagination per group
              const totalPages = Math.ceil(groups[group].length / PER_PAGE) || 1;
              const paginated = groups[group].slice((page - 1) * PER_PAGE, page * PER_PAGE);
              return (
                <section key={group} className="mb-16">
                  {/* Major Sections */}
                  <h2 className="text-foreground text-2xl md:text-3xl font-bold font-serif mb-8 flex items-center gap-2">
                    {group}
                  </h2>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {paginated.map((video) => (
                      <Card key={video.id} className="bg-white/85 text-gray-700 p-4 flex flex-col items-center">
                        <div className="w-full aspect-video mb-4">
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                          ></iframe>
                        </div>
                        <h2 className="text-foreground text-lg font-semibold mb-1 text-center group-hover:text-primary transition-colors">
                          {video.title}
                        </h2>
                        <p className="text-foreground text-xs text-[oklch(0.18_0_0)] mb-2 text-center">
                          {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                        </p>
                        <p className="text-foreground text-sm text-[oklch(0.18_0_0)] line-clamp-3 text-center mb-3">{video.description}</p>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-medium text-xs shadow hover:bg-primary/90 transition-colors"
                        >
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          Watch on YouTube
                        </a>
                      </Card>
                    ))}
                  </div>
                  {/* Pagination controls per group */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-[oklch(0.18_0_0)]">
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </section>
              );
            })}
          </>;
        })()}

        {/* Podcast Section */}
        <section className="mb-16 mt-24">
          <h2 className="text-foreground text-2xl md:text-3xl font-bold font-serif mb-8 flex items-center gap-2">
            Podcasts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center shadow-md w-full col-span-2">
              <img src="/icon-512x512.png" alt="Agape Bible Church Podcast" className="w-20 h-20 mb-4 rounded-full shadow" />
              {/* Subsections */}
              <h3 className="text-foreground text-xl font-semibold mb-2 text-center">Agape Bible Church Podcast</h3>
              <p className="text-foreground text-base text-[oklch(0.18_0_0)] mb-4 text-center">
                Listen to all our latest sermons, Bible studies, and inspirational messages on Spotify. Scroll and play any episode below!
              </p>
              <iframe 
                src="https://open.spotify.com/embed/show/45oJua9cpBUCHKeh2WoZMH?utm_source=generator&theme=0" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-2"
                title="Agape Bible Church Podcast on Spotify"
              ></iframe>
              <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow hover:bg-primary/90 transition-colors mt-2">
                <span className="mr-2">🎧</span> Listen on Spotify
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SermonsPage; 