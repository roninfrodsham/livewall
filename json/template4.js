const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 3,
      w: 1,
      h: 1,
      data: {
        name: 'stocks',
        url: '',
        title: ''
      }
    },
    {
      name: 'stocks',
      refreshTime: 5,
      endPoint: `${uri}/api/stocks`,
      list: '',
      x: 1,
      y: 3,
      w: 2,
      h: 5,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 2,
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
      x: 3,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 9,
      y: 0,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'instagram',
      refreshTime: 10,
      endPoint: `${uri}/api/instagram`,
      list: '',
      x: 10,
      y: 2,
      w: 4,
      h: 6,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 9,
      y: 2,
      w: 1,
      h: 1,
      data: {
        name: 'instagram',
        url: '',
        title: ''
      }
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 15,
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
      x: 16,
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
      name: 'facebook',
      refreshTime: 5,
      endPoint: `${uri}/api/facebook`,
      list: '',
      x: 18,
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
      x: 17,
      y: 5,
      w: 1,
      h: 1,
      data: {
        name: 'facebook',
        url: '',
        title: ''
      }
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 22,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'earnings'
      }
    },
    {
      name: 'earnings',
      refreshTime: 3,
      endPoint: `${uri}/earnings`,
      list: '',
      x: 23,
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
      x: 29,
      y: 3,
      w: 3,
      h: 3,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;