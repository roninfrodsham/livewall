const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'storyLogo',
        url: '',
        title: ''
      }
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 5,
      w: 3,
      h: 3,
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
        name: 'live'
      }
    },
    {
      name: 'liveFeed',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 12,
      y: 1,
      w: 5,
      h: 3,
      data: {
        title: '',
        path: 'http://192.168.0.66/httplive/stream.m3u8',
        isLive: true
      }
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
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 19,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 3,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'airports',
      refreshTime: 10,
      endPoint: `${uri}/api/airports`,
      list: '',
      x: 9,
      y: 5,
      w: 7,
      h: 2,
      data: {}
    },   
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 20,
      y: 5,
      w: 3,
      h: 3,
      data: {}
    },     
    {
      name: 'onThisDay',
      refreshTime: 10,
      endPoint: `${uri}/api/onthisday`,
      list: '',
      x: 1,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;