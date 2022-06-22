const uri = process.env.URI;

let data = {
  components: [
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 0,
      w: 3,
      h: 5,
      animationTime: 1,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 8,
      y: 3,
      w: 4,
      h: 3,
      animationTime: 8,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 13,
      y: 0,
      w: 4,
      h: 3,
      animationTime: 1.5,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 3,
      w: 3,
      h: 3,
      animationTime: 8.5,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 21,
      y: 0,
      w: 3,
      h: 2,
      animationTime: 2,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 2,
      w: 3,
      h: 2,
      animationTime: 9,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 5,
      w: 3,
      h: 2,
      animationTime: 1,
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 8,
      y: 6,
      w: 4,
      h: 2,
      animationTime: 8,
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 13,
      y: 3,
      w: 4,
      h: 2,
      animationTime: 1.5,
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 18,
      y: 6,
      w: 4,
      h: 1,
      animationTime: 8.5,
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 24,
      y: 0,
      w: 4,
      h: 2,
      animationTime: 2,
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 4,
      w: 3,
      h: 3,
      animationTime: 9,
      data: {
        text: ''
      }
    },
    {
      name: 'blank',
      x: 3,
      y: 0,
      w: 8,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 9,
      y: 2,
      w: 2,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 14,
      y: 5,
      w: 2,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 14,
      y: 6,
      w: 4,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 28,
      y: 0,
      w: 3,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: -1,
      y: -1,
      animationTime: '3.0',
      soundID: 'heritageLinesShow',
      data: {}
    }
  ],
  lines: [
    {
      animationTime: '3.0',
      animationDuration: '5.0',
      points: [
        {
          x: 780,
          y: 270
        },
        {
          x: 2600,
          y: 270
        },
        {
          x: 2600,
          y: 810
        }
      ]
    },
    {
      animationTime: '3.5',
      animationDuration: '5.0',
      points: [
        {
          x: 3900,
          y: 1350
        },
        {
          x: 3900,
          y: 1755
        },
        {
          x: 4680,
          y: 1755
        }
      ]
    },
    {
      animationTime: '4.0',
      animationDuration: '5.0',
      points: [
        {
          x: 7280,
          y: 270
        },
        {
          x: 7930,
          y: 270
        },
        {
          x: 7930,
          y: 540
        }
      ]
    }
  ]
}

module.exports.data = data;