interface Core {
  matrix: rowNum[]
}

class Core {
  constructor() {
    this.matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  }

  /**
   * 初始化
   * @returns
   */
  init(): resType {
    this.randomSpace()
    this.randomSpace()
    return {
      arr: this.matrix,
    }
  }

  /**
   * 向左移动
   * @returns
   */
  move_left(): resType {
    // 遍历每一行
    for (let i = 0; i < this.matrix.length; i++) {
      this.zero_to_end(this.matrix[i])
      this.merge(this.matrix[i])
    }
    return {
      arr: this.matrix,
      over: this.randomSpace(),
    }
  }

  /**
   * 向右移动
   * @returns
   */
  move_right(): resType {
    let arr: rowNum = []
    // 遍历每一行
    for (let i = 0; i < this.matrix.length; i++) {
      // 每一行反转
      arr = this.matrix[i].reverse()
      this.zero_to_end(arr)
      this.merge(arr)
      // 反转回来
      this.matrix[i] = arr.reverse()
    }
    return {
      arr: this.matrix,
      over: this.randomSpace(),
    }
  }

  /**
   * 向上移动
   * @returns
   */
  move_up(): resType {
    this.transpose()
    this.move_left()
    this.transpose()
    return {
      arr: this.matrix,
      over: this.randomSpace(),
    }
  }

  /**
   * 向下移动
   * @returns
   */
  move_down(): resType {
    this.transpose()
    this.move_right()
    this.transpose()
    return {
      arr: this.matrix,
      over: this.randomSpace(),
    }
  }

  /**
   * 0元素移动到末尾
   * @param arr
   * @returns
   */
  private zero_to_end(arr: rowNum): rowNum {
    // 倒序遍历
    for (let i = arr.length - 1; i >= 0; i--) {
      // 发现0删除，末尾添加0
      if (arr[i] === 0) {
        arr.splice(i, 1)
        arr.push(0)
      }
    }
    return arr
  }

  /**
   * 合并相同元素
   * @param arr
   * @returns
   */
  private merge(arr: rowNum): rowNum {
    // 正序遍历 arr.length - 1避免越界
    for (let i = 0; i < arr.length - 1; i++) {
      // 对比相邻两个元素是否相等，相等则合并
      if (arr[i] === arr[i + 1]) {
        arr[i] = (arr[i] * 2) as num
        arr.splice(i + 1, 1)
        arr.push(0)
      }
    }
    return arr
  }

  /**
   * 转置矩阵
   */
  private transpose() {
    for (let r = 0; r < this.matrix.length; r++) {
      for (let c = 0; c < r; c++) {
        const temp = this.matrix[r][c]
        this.matrix[r][c] = this.matrix[c][r]
        this.matrix[c][r] = temp
      }
    }
  }

  /**
   * 找到空白位置
   * @returns
   */
  private findSpace(): spaceArr[] {
    const spaceArr: spaceArr[] = []
    for (let r = 0; r < this.matrix.length; r++) {
      for (let c = 0; c < this.matrix[r].length; c++) {
        if (this.matrix[r][c] === 0) {
          spaceArr.push({ r, c })
        }
      }
    }
    return spaceArr
  }

  /**
   * 生产随机数
   * @returns
   */
  private randomNum() {
    return Math.random() < 0.8 ? 2 : 4
  }

  /**
   * 随机空白位置生成数字
   * @returns
   */
  private randomSpace(): boolean {
    const spaceArr = this.findSpace()
    if (spaceArr.length === 0) {
      return this.game_over()
    }
    const space = Math.floor(Math.random() * spaceArr.length)
    const { r, c } = spaceArr[space]
    this.matrix[r][c] = this.randomNum()
    // 手动false
    return false
  }

  /**
   * 游戏结束
   * @returns
   */
  private game_over(): boolean {
    let gameOver = false
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] === 0) {
          gameOver = false
          return gameOver
        }
        if (this.matrix[i][j] === this.matrix[i][j + 1]) {
          gameOver = false
          return gameOver
        }
        if (this.matrix[i][j] === this.matrix[i + 1]?.[j]) {
          gameOver = false
          return gameOver
        }
      }
    }
    gameOver = true
    return gameOver
  }
}

export default Core
