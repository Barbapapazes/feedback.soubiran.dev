
export interface FeedbackSummary {
  positive: {
    total: number
    percent: number
    breakdown: {
      'Love It': number
      'It\'s ok': number
    }
  }
  negative: {
    total: number
    percent: number
    breakdown: {
      'Not great': number
      'Hate it': number
    }
  }
  comments: number
  average_rating: number
}

export interface FeedbackPage {
  url: string
  positive: {
    total: number
    percent: number
    breakdown: {
      'Love it': number
      'It\'s ok': number
    }
  }
  negative: {
    total: number
    percent: number
    breakdown: {
      'Not great': number
      'Hate it': number
    }
  }
  comments: number
  average_rating: number
}
