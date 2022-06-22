const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'airports',
      refreshTime: 10,
      endPoint: `${uri}/api/flights`,
      list: '',
      x: 6,
      y: 0,
      w: 7,
      h: 2,
      data: {}
    },
    {
      name: 'holiday',
      refreshTime: -1,
      endPoint: `${uri}/api/holidays`,
      list: '',
      x: 1,
      y: 0,
      w: 4,
      h: 2,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 0,
      y: 4,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'mediaPlayer',
      refreshTime: -1,
      endPoint: `${uri}/api/mediaplayer`,
      list: '',
      x: 10,
      y: 4,
      w: 5,
      h: 3,
      data: {}
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 9,
      y: 4,
      w: 1,
      h: 1,
      data: { name: 'play' }
    },
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: `${uri}/api/weather`,
      list: '',
      x: 16,
      y: 4,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'clocks',
      refreshTime: 10,
      endPoint: `${uri}/api/clocks`,
      list: '',
      x: 16,
      y: 1,
      w: 4,
      h: 2,
      data: {}
    },
    {
      name: 'twitter',
      refreshTime: 5,
      endPoint: `${uri}/api/twitter`,
      list: "",
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
      list: "",
      x: 22,
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
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 2,
      w: 3,
      h: 3,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;