const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'instagram',
      refreshTime: 10,
      endPoint: `${uri}/api/instagram`,
      list: '',
      x: 17,
      y: 1,
      w: 4,
      h: 6,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 16,
      y: 1,
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
      x: 9,
      y: 3,
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
      x: 10,
      y: 3,
      w: 5,
      h: 3,
      data: {}
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
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 4,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 9,
      y: 7,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 2,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 6,
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
      name: 'news',
      refreshTime: 3,
      endPoint: `${uri}/api/news`,
      list: '',
      x: 7,
      y: 0,
      w: 6,
      h: 2,
      data: {}
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
    }
  ],
  lines: []
}

module.exports.data = data;