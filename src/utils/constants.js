const api_key = "AIzaSyCj5xDt1tXU-4-HVwhEoKiYUKHT6WiP1VA";
export const api_url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" + api_key;
export const search_api_url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=" + api_key; 
// export const search_suggestion_url = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&"
export const search_suggestion_url = "https://suggestqueries-clients6.youtube.com/complete/search?client=youtube-reduced&hl=en&gs_ri=youtube-reduced&ds=yt&cp=3&gs_id=100&xhr=t&xssi=t&gl=us"
export const initialComments = [
  {
    id: '1',
    author: 'Harsh Jain',
    authorImage: '',
    text: 'This is a great video! Thanks for sharing.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    likes: 24,
    replies: [
      {
        id: '1-1',
        author: 'zeus jain',
        authorImage: 'https://i.pravatar.cc/150?u=zeusjain',
        text: 'I agree! The content is very informative.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 5,
        replies: []
      },
      {
        id: '1-2',
        author: 'zigmocat',
        authorImage: 'https://i.pravatar.cc/150?u=zigmocat',
        text: 'Could you explain more about the topic at 2:30?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        likes: 2,
        replies: []
      }
    ]
  },
  {
    id: '2',
    author: 'zeus jain',
    authorImage: 'https://i.pravatar.cc/150?u=zeusjain',
    text: 'I learned so much from this. Keep up the good work!',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 15,
    replies: []
  }
];