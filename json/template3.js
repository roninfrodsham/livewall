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
      y: 4,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 9,
      y: 0,
      w: 1,
      h: 1,
      data: {
        name: 'twitter',
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
      y: 4,
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
      x: 16,
      y: 4,
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
      h: 3,
      data: {}
    },
    {
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 2,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'holiday',
      refreshTime: -1,
      endPoint: `${uri}/api/holiday`,
      list: '',
      x: 9,
      y: 5,
      w: 4,
      h: 2,
      data: {}
    },
    {
      name: 'twitter',
      refreshTime: 5,
      endPoint: `${uri}/api/twitter`,
      list: '',
      x: 10,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: `${uri}/api/weather`,
      list: '',
      x: 17,
      y: 1,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'airports',
      refreshTime: 10,
      endPoint: `${uri}/api/airports`,
      list: '',
      x: 24,
      y: 0,
      w: 7,
      h: 2,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;