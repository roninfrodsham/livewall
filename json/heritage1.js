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
      x: 8,
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
      x: 13,
      y: 1,
      w: 4,
      h: 2,
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
      x: 17,
      y: 6,
      w: 3,
      h: 2,
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
      x: 19,
      y: 0,
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
      y: 1,
      w: 3,
      h: 3,
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
      animationTime: '1',
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
      y: 2,
      w: 3,
      h: 3,
      animationTime: '8',
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
      h: 1,
      animationTime: '1.5',
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
      y: 6,
      w: 4,
      h: 2,
      animationTime: '8.5',
      data: {
        text: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 19,
      y: 3,
      w: 4,
      h: 2,
      animationTime: '2',
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
      animationTime: '9',
      data: {
        text: ''
      }
    },
    {
      name: 'blank',
      x: 1,
      y: 0,
      w: 7,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 17,
      y: 3,
      w: 1,
      h: 3,
      data: {}
    },
    {
      name: 'blank',
      x: 23,
      y: 1,
      w: 5,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: 27,
      y: 0,
      w: 4,
      h: 1,
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
          x: 2080,
          y: 270
        }
      ]
    },
    {
      animationTime: '3.5',
      animationDuration: '5.0',
      points: [
        {
          x: 4420,
          y: 945
        },
        {
          x: 4550,
          y: 945
        },
        {
          x: 4550,
          y: 1620
        }
      ]
    },
    {
      animationTime: '4.0',
      animationDuration: '5.0',
      points: [
        {
          x: 5980,
          y: 405
        },
        {
          x: 7150,
          y: 405
        },
        {
          x: 7150,
          y: 135
        },
        {
          x: 7930,
          y: 135
        },
        {
          x: 7930,
          y: 270
        }
      ]
    }
  ]
}

module.exports.data = data;