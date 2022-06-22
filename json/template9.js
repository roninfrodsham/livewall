const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 13,
      y: 5,
      w: 1,
      h: 1,
      data: {
        name: 'twitter',
        url: '',
        title: ''
      }
    },
    {
      name: 'twitter',
      refreshTime: 5,
      endPoint: '/twitter',
      list: "",
      x: 14,
      y: 5,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 8,
      y: 3,
      w: 3,
      h: 3,
      data: {}
    }, 
    {
      name: 'stocks',
      refreshTime: 5,
      endPoint: '',
      list: '',
      x: 1,
      y: 1,
      w: 2,
      h: 5,
      data: {}
    }, 
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 1,
      w: 1,
      h: 1,
      data: {
        name: 'stocks'
      }
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 24,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'news'
      }
    },    
    {
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 25,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },    
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 11,
      y: 1,
      w: 1,
      h: 1,
      data: {
        name: 'play'
      }
    },
    {
      name: 'mediaPlayer',
      refreshTime: -1,
      endPoint: `${uri}/api/mediaplayer`,
      list: '',
      x: 12,
      y: 1,
      w: 5,
      h: 3,
      data: {}
    },    
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 3,
      w: 3,
      h: 5,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 21,
      y: 5,
      w: 3,
      h: 3,
      data: {}
    },   
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 4,
      y: 0,
      w: 5,
      h: 1,
      data: {
        name: "DOW",
        points: "29.17",
        performance: "57.16 (0.78%)",
        top: "As of 1:17PM EDT. Market Open",
        title: "The Dow Chemical Company",
        bottom: "NYSE - Nasdaq Real-time price. Currency in USD"
      }
    },    
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: '',
      list: "",
      x: 18,
      y: 2,
      w: 5,
      h: 2,
      data: {}
    }    
  ],
  lines: []
}

module.exports.data = data;