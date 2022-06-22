const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 4,
      w: 1,
      h: 1,
      data: {
        name: 'play'
      }
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 24,
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
      x: 25,
      y: 0,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'mediaPlayer',
      refreshTime: -1,
      endPoint: `${uri}/api/mediaplayer`,
      list: '',
      x: 19,
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
      x: 0,
      y: 1,
      w: 3,
      h: 3,
      data: {}
    },
    {
      name: 'weather',
      refreshTime: -1,
      endPoint: `${uri}/api/weather`,
      list: "",
      x: 18,
      y: 1,
      w: 5,
      h: 2,
      data: {}
    },
    {
      name: 'image',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 11,
      y: 3,
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
      endPoint: `${uri}/api/twitter`,
      list: '',
      x: 12,
      y: 3,
      w: 6,
      h: 2,
      data: {}
    }, 
    {
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 12,
      y: 6,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'imageSequence',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 4,
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
      x: 5,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },    
    {
      name: 'clocks',
      refreshTime: 10,
      endPoint: `${uri}/api/clocks`,
      list: '',
      x: 12,
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
      y: 3,
      w: 3,
      h: 3,
      data: {}
    }    
  ],
  lines: []
}

module.exports.data = data;