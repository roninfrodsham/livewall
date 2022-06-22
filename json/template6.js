const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 2,
      w: 1,
      h: 1,
      data: {
        name: 'facebook',
        url: '',
        title: ''
      }
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 1,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'dowconnect',
        url: '',
        title: ''
      }
    },
    {
      name: 'dowconnect',
      refreshTime: 10,
      endPoint: `${uri}/api/dowconnect`,
      list: '',
      x: 2,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 8,
      y: 2,
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
      x: 9,
      y: 2,
      w: 5,
      h: 3,
      data: {}
    },
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 10,
      y: 7,
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
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 3,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 14,
      y: 5,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'facebook',
      refreshTime: 5,
      endPoint: `${uri}/api/facebook`,
      list: '',
      x: 18,
      y: 3,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: `${uri}/api/weather`,
      list: "",
      x: 25,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },    
    {
      name: 'holiday',
      refreshTime: -1,
      endPoint: `${uri}/api/holiday`,
      list: '',
      x: 14,
      y: 0,
      w: 4,
      h: 2,
      data: {}
    },    
    {
      name: 'stocks',
      refreshTime: 5,
      endPoint: `${uri}/api/stocks`,
      list: '',
      x: 30,
      y: 3,
      w: 2,
      h: 5,
      data: {}
    },    
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 11,
      y: 6,
      w: 1,
      h: 1,
      data: {
        name: 'news'
      }
    },   
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 3,
      w: 1,
      h: 1,
      data: {
        name: 'stocks'
      }
    }
  ],
  lines: []
}

module.exports.data = data;