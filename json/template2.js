const uri = process.env.URI;

let data = {
  components: [
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
        name: 'facebook',
        url: '',
        title: ''
      }
    },
    {
      name: 'facebook',
      refreshTime: 5,
      endPoint: `${uri}/api/facebook`,
      list: '',
      x: 2,
      y: 0,
      w: 6,
      h: 2,
      data: {}
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
      name: 'stocks',
      refreshTime: 5,
      endPoint: `${uri}/api/stocks`,
      list: '',
      x: 11,
      y: 0,
      w: 2,
      h: 5,
      data: {}
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 10,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'stocks',
        url: '',
        title: ''
      }
    },
    {
      name: 'onThisDay',
      refreshTime: 10,
      endPoint: `${uri}/api/onthisday`,
      list: '',
      x: 8,
      y: 6,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'imageSequence'
      ,
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 14,
      y: 1,
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
      x: 15,
      y: 1,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 14,
      y: 4,
      w: 1,
      h: 1,
      data: {
        name: 'live'
      }
    },
    {
      name: 'liveFeed',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 15,
      y: 4,
      w: 5,
      h: 3,
      data: {
        title: '',
        path: 'http://192.168.0.66/httplive/stream.m3u8',
        isLive: true
      }
    },
    {
      name: 'clocks',
      refreshTime: 10,
      endPoint: `${uri}/api/clocks`,
      list: '',
      x: 22,
      y: 0,
      w: 4,
      h: 2,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 1,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 21,
      y: 3,
      w: 3,
      h: 3,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;