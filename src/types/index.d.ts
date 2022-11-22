declare type num = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

declare type rowNum = num[]

declare type spaceArr = { [key: string]: number }

declare type resType = { arr: rowNum[]; over?: boolean }
