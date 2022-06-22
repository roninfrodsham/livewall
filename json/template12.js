const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 17,
      y: 1,
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
      y: 3,
      w: 3,
      h: 3,
      data: {}
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
      x: 18,
      y: 1,
      w: 6,
      h: 2,
      data: {}
    },    
    {
      name: 'holiday',
      refreshTime: -1,
      endPoint: `${uri}/api/holidays`,
      list: '',
      x: 10,
      y: 0,
      w: 4,
      h: 2,
      data: {}
    },    
    {
      name: 'twitter',
      refreshTime: 5,
      endPoint: `${uri}/api/twitter`,
      list: "",
      x: 9,
      y: 4,
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
      y: 6,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: `${uri}/api/weather`,
      list: "",
      x: 2,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },    
    {
      name: 'clocks',
      refreshTime: 10,
      endPoint: `${uri}/api/clocks`,
      list: '',
      x: 27,
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
      x: 8,
      y: 4,
      w: 1,
      h: 1,
      data: {
        name: 'twitter',
        url: '',
        title: ''
      }
    }
  ],
  lines: []
}

module.exports.data = data;