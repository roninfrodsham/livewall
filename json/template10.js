const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'instagram',
      refreshTime: 10,
      endPoint: `${uri}/api/instagram`,
      list: '',
      x: 9,
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
      x: 8,
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
      name: 'stockDow',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 13,
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
      x: 17,
      y: 5,
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
      name: 'earnings',
      refreshTime: 3,
      endPoint: `${uri}/earnings`,
      list: '',
      x: 18,
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
      x: 2,
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
      x: 15,
      y: 2,
      w: 4,
      h: 2,
      data: {}
    },    
    {
      name: 'holiday',
      refreshTime: -1,
      endPoint: `${uri}/api/holidays`,
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
      x: 20,
      y: 0,
      w: 4,
      h: 3,
      data: {}
    }
  ],
  lines: []
}

module.exports.data = data;