export interface GalleryVideo {
	id: string;
	title: string;
	videoSrc: string; // MP4 file path
	poster?: string;
	category?: string;
}

export interface GalleryPost {
	id: string;
	title: string;
	type: 'image' | 'video';
	image?: string;
	videoSrc?: string;
	link?: string;
	category?: string;
}

export const galleryVideos: GalleryVideo[] = [
	// ── Featured / Top videos ──
	{ id: '21', title: 'ENG PPE Sample', videoSrc: '/gallery/videos/ENG%20PPE%20SAMPLE.mp4' },
	{id: '33',title: 'Pharma Company PPE',videoSrc: '/gallery/videos/pharma%20company%20ppe.mp4'},
	{ id: '14', title: 'Brotherspath AI Video', videoSrc: '/gallery/videos/brotherspath%20ai%20video%20.mp4' },
	{ id: '19', title: 'Brotherman Reel (New)', videoSrc: '/gallery/videos/Copy%20of%20Brotherman%20reel%20new.mp4' },
	{ id: '18', title: 'Conceptual Video - Podcast', videoSrc: '/gallery/videos/Conceptual%20video%20-%20Podcast.mp4' },
	{ id: '20', title: 'Easylife', videoSrc: '/gallery/videos/Easylife%20B.mp4' },
	{ id: '24', title: 'Yash Ria Video', videoSrc: '/gallery/videos/final%20yash%20ria%20video.mp4' },
	{ id: '16', title: 'City2City Draft', videoSrc: '/gallery/videos/city%202%20city%20draft%202.mp4' },
	{ id: '25', title: 'Grupio Reel Designs', videoSrc: '/gallery/videos/Grupio%20Reel%20Designs.mp4' },
	{ id: '27', title: 'Mortgage', videoSrc: '/gallery/videos/MORTAGE.mp4' },
	{ id: '28', title: 'Post 4', videoSrc: '/gallery/videos/post%204.mp4' },
	{ id: '32', title: 'Bizfusion AI Update (2)', videoSrc: '/gallery/videos/update%20Bizfusion%20ai%20(2).mp4' },
	{ id: '31', title: 'Swadeshi Amrud Tea', videoSrc: '/gallery/videos/Swadeshi%20amrud%20tea.mp4' },
		{ id: '17', title: 'Conceptual Video - Mermaid', videoSrc: '/gallery/videos/Conceptual%20video%20-%20Mermaind.mp4' },

	// ── Rest of the videos ──
	{ id: '1', title: 'Avantika Video', videoSrc: '/gallery/videos/_avantika%20video.mp4' },
	{ id: '2', title: 'Bizfusion Reel 4', videoSrc: '/gallery/videos/_Bizfusion%20%20reel%204.mp4' },
	{ id: '3', title: 'Reel 3', videoSrc: '/gallery/videos/_Reel%203.mp4' },
	{ id: '4', title: 'Wellyfy', videoSrc: '/gallery/videos/_wellyfy%202.mp4' },
	{ id: '5', title: 'Bizfusion Hotel', videoSrc: '/gallery/videos/3%20bizfusion%20hotel.mp4' },
	{ id: '6', title: 'Allergy Brotherspath AI', videoSrc: '/gallery/videos/allergy%20brotherspath%20ai%20video%20.mp4' },
	{ id: '7', title: 'Avantika Diwali', videoSrc: '/gallery/videos/avantika%20diwali%20video.mp4' },
	{ id: '8', title: 'Avantika Rakhi', videoSrc: '/gallery/videos/avantika%20rakhi%20video.mp4' },
	{ id: '9', title: 'Bizfusion Reel 5', videoSrc: '/gallery/videos/Bizfusion%20%20reel%205.mp4' },
	{ id: '10', title: 'Bizfusion Generic', videoSrc: '/gallery/videos/Bizfusion%20Generic_Final.mp4' },
	{ id: '11', title: 'Bizfusion Reel 2', videoSrc: '/gallery/videos/Bizfusion%20reel%202.mp4' },
	{ id: '12', title: 'Brotherman Reel 3', videoSrc: '/gallery/videos/Brotherman%20Reel%203.mp4' },
	{ id: '13', title: 'Brotherman', videoSrc: '/gallery/videos/brotherman.mp4' },
	{ id: '15', title: 'Brotherspath Begumganj', videoSrc: '/gallery/videos/brotherspath%20begumganj.mp4' },
	{ id: '22', title: 'EZeeComforts SMM (2)', videoSrc: '/gallery/videos/EZeeComforts%20SMM%20(2).mp4' },
	{ id: '23', title: 'Bizfusion Auto Care', videoSrc: '/gallery/videos/final%20BIZFUSION%20AUTO%20CARE.mp4' },
	{ id: '29', title: 'Post 7', videoSrc: '/gallery/videos/post%207.mp4' },
	{ id: '30', title: 'Rati Export', videoSrc: '/gallery/videos/Rati%20Expport.mp4' }
];

export const galleryPosts: GalleryPost[] = [
	{ id: '1', title: 'Post 1', type: 'image', image: '/gallery/posts/1.png' },
	{ id: '7', title: 'Post 2', type: 'image', image: '/gallery/posts/112.jpg' },
	{ id: '9', title: 'Post 3', type: 'image', image: '/gallery/posts/114.jpg' },
	{ id: '10', title: 'Post 4', type: 'image', image: '/gallery/posts/115.jpg' },
	{ id: '11', title: 'Post 5', type: 'image', image: '/gallery/posts/Copy%20of%201%20(4).jpg' },
	{ id: '5', title: 'Post 6', type: 'image', image: '/gallery/posts/70.jpg' },
	{ id: '12', title: 'Post 7', type: 'image', image: '/gallery/posts/Copy%20of%201.png' },
	{ id: '13', title: 'Post 8', type: 'image', image: '/gallery/posts/Copy%20of%201(1).jpg' },
	{ id: '3', title: 'Post 9', type: 'image', image: '/gallery/posts/62.jpg' },
	{ id: '14', title: 'Post 10', type: 'image', image: '/gallery/posts/Copy%20of%202(1).jpg' },
	{ id: '15', title: 'Post 11', type: 'image', image: '/gallery/posts/Copy%20of%2047.jpg' },
	{ id: '8', title: 'Post 12', type: 'image', image: '/gallery/posts/113.jpg' },
	{ id: '16', title: 'Post 13', type: 'video', videoSrc: '/gallery/posts/Copy%20of%2048.mp4' },
	{ id: '17', title: 'Post 14', type: 'image', image: '/gallery/posts/Copy%20of%20Copy%20of%20BANNER%201.jpeg' },
	{ id: '18', title: 'Post 15', type: 'image', image: '/gallery/posts/Copy%20of%20Copy%20of%20solcare%20posts.png' },
	{ id: '19', title: 'Post 16', type: 'video', videoSrc: '/gallery/posts/Copy%20of%20HDFC.mp4' },
	{ id: '2', title: 'Post 17', type: 'image', image: '/gallery/posts/57%20Trend.png' },
	{ id: '20', title: 'Post 18', type: 'image', image: '/gallery/posts/Copy%20of%20Maggies%20pizza.jpg' },
	{ id: '4', title: 'Post 19', type: 'image', image: '/gallery/posts/68.jpg' },
	{ id: '21', title: 'Post 20', type: 'image', image: '/gallery/posts/Copy%20of%20MARCELLO.jpg' },
	{ id: '22', title: 'Post 21', type: 'image', image: '/gallery/posts/Copy%20of%20MBU%20Arts%20(3).jpg' },
	{ id: '23', title: 'Post 22', type: 'image', image: '/gallery/posts/Copy%20of%20olympus2.jpg' },
	{ id: '24', title: 'Post 23', type: 'image', image: '/gallery/posts/Copy%20of%20Psarv%20website%20banners.jpg' },
	{ id: '25', title: 'Post 24', type: 'image', image: '/gallery/posts/Copy%20of%20solcare%20posts.jpg' },
	{ id: '26', title: 'Post 25', type: 'image', image: '/gallery/posts/Copy%20of%20wags%20and%20tails.png' },
	{ id: '27', title: 'Post 26', type: 'video', videoSrc: '/gallery/posts/Copy%20of%20Xpandretail%20People%20.mp4' },
	{ id: '28', title: 'Post 27', type: 'image', image: '/gallery/posts/grupio%20poll%20post.jpg' },
	{ id: '29', title: 'Post 28', type: 'video', videoSrc: '/gallery/posts/magic%20hands.mp4' },
	{ id: '30', title: 'Post 29', type: 'image', image: '/gallery/posts/post%202.jpg' },
	{ id: '31', title: 'Post 30', type: 'image', image: '/gallery/posts/post%203.jpg' },
	{ id: '32', title: 'Post 31', type: 'video', videoSrc: '/gallery/posts/post%204%20(1).mp4' },
	{ id: '6', title: 'Post 32', type: 'image', image: '/gallery/posts/72.jpg' },
	{ id: '33', title: 'Post 33', type: 'image', image: '/gallery/posts/post%206.jpg' },
	{ id: '34', title: 'Post 34', type: 'image', image: '/gallery/posts/post%208.jpg' },
	{ id: '35', title: 'Post 35', type: 'image', image: '/gallery/posts/post%2013.jpg' },
	{ id: '36', title: 'Post 36', type: 'video', videoSrc: '/gallery/posts/seb.mp4' },
	{ id: '37', title: 'Post 37', type: 'image', image: '/gallery/posts/Trend%2033.png' },
	{ id: '38', title: 'Post 38', type: 'video', videoSrc: '/gallery/posts/upddated%20Reel%20Ruchitownship.mp4' }
];