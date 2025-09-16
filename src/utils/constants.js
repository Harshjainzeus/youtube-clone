const api_key = "AIzaSyCj5xDt1tXU-4-HVwhEoKiYUKHT6WiP1VA";
export const api_url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" + api_key;
export const search_api_url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=" + api_key; 
// export const search_suggestion_url = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&"
export const search_suggestion_url = "https://suggestqueries-clients6.youtube.com/complete/search?client=youtube-reduced&hl=en&gs_ri=youtube-reduced&ds=yt&cp=3&gs_id=100&xhr=t&xssi=t&gl=us"
export const comments  = [
    {
      name: "John Doe",
      comment: "This is a comment",
      likes: 10,
      replies: [
        {
          name:"apple",
          comment:"This is a reply",
          likes: 10,
          replies: [
            {
              name:"orange",
              comment:"This is a reply",
              likes: 10,
              replies: [
                {
                  name:"banana",
                  comment:"This is a reply",
                  likes: 10,
                  replies: []
                }
              ]
            },
            {
              name:"orange",
              comment:"This is a reply",
              likes: 10,
              replies: [
                {
                  name:"banana",
                  comment:"This is a reply",
                  likes: 10,
                  replies: []
                }
              ]
            },
            {
              name:"orange",
              comment:"This is a reply",
              likes: 10,
              replies: [
                {
                  name:"banana",
                  comment:"This is a reply",
                  likes: 10,
                  replies: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Johnyy Doe",
      comment: "This is a comment",
      likes: 10,
      replies: [
        {
          name:"apple",
          comment:"This is a reply",
          likes: 10,
          replies: [
            {
              name:"orange",
              comment:"This is a reply",
              likes: 10,
              replies: [
                {
                  name:"banana",
                  comment:"This is a reply",
                  likes: 10,
                  replies: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "abraham",
      comment: "This is a comment",
      likes: 10,
      replies: [
        {
          name:"apple",
          comment:"This is a reply",
          likes: 10,
          replies: [
            {
              name:"orange",
              comment:"This is a reply",
              likes: 10,
              replies: [
                {
                  name:"banana",
                  comment:"This is a reply",
                  likes: 10,
                  replies: []
                }
              ]
            }
          ]
        }
      ]
    },
  
    ]