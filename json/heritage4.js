const uri = process.env.URI;

let data = {
  components: [
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 0,
      y: 2,
      w: 3,
      h: 2,
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
      endPoint: "",
      list: "",
      x: 10,
      y: 0,
      w: 3,
      h: 2,
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
      endPoint: "",
      list: "",
      x: 8,
      y: 5,
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
      endPoint: "",
      list: "",
      x: 15,
      y: 0,
      w: 4,
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
      endPoint: "",
      list: "",
      x: 20,
      y: 2,
      w: 4,
      h: 3,
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
      endPoint: "",
      list: "",
      x: 29,
      y: 0,
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
      y: 4,
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
      x: 7,
      y: 0,
      w: 3,
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
      x: 8,
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
      x: 15,
      y: 3,
      w: 4,
      h: 2,
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
      x: 20,
      y: 5,
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
      y: 2,
      w: 3,
      h: 2,
      animationTime: 9,
      data: {
        text: ''
      }
    },
    {
      name: 'blank',
      x: 1,
      y: 0,
      w: 6,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 12,
      y: 6,
      w: 6,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 16,
      y: 5,
      w: 2,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 21,
      y: 0,
      w: 8,
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
          x: 390,
          y: 540
        },
        {
          x: 390,
          y: 270
        },
        {
          x: 1820,
          y: 270
        }
      ]
    },
    {
      animationTime: '3.5',
      animationDuration: '5.0',
      points: [
        {
          x: 3120,
          y: 1755
        },
        {
          x: 4420,
          y: 1755
        },
        {
          x: 4420,
          y: 1350
        }
      ]
    },
    {
      animationTime: '4.0',
      animationDuration: '5.0',
      points: [
        {
          x: 5720,
          y: 540
        },
        {
          x: 5720,
          y: 270
        },
        {
          x: 7540,
          y: 270
        }
      ]
    }
  ]
}

module.exports.data = data;