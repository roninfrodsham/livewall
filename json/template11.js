const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 4,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'stocks',
      refreshTime: 5,
      endPoint: `${uri}/api/stocks`,
      list: '',
      x: 30,
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
      x: 29,
      y: 1,
      w: 1,
      h: 1,
      data: {
        name: 'stocks'
      }
    },    
    {
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 3,
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
      x: 11,
      y: 0,
      w: 5,
      h: 1,
      data: {}
    }, 
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 10,
      y: 2,
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
      x: 11,
      y: 2,
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
      x: 9,
      y: 6,
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
      x: 10,
      y: 6,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 19,
      y: 1,
      w: 3,
      h: 3,
      data: {}
    },    
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 2,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'news'
      }
    },    
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: '',
      list: "",
      x: 23,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },     
    {
      name: 'airports',
      refreshTime: 10,
      endPoint: `${uri}/api/airports`,
      list: '',
      x: 17,
      y: 5,
      w: 7,
      h: 2,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;