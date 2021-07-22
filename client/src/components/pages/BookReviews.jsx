import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
}))

function BookReviews (props) {
  const classes = useStyle()
  return (
    <div className={classes.content}>
      <div className="card mb-3" >
        <img src="..." className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Заголовок карточки</h5>
            <p className="card-text">Это более широкая карточка с вспомогательным текстом ниже в качестве естественного
              перехода к дополнительному контенту. Этот контент немного длиннее.</p>
            <p className="card-text"><small className="text-muted">Последнее обновление 3 мин. назад</small></p>
          </div>
      </div>
    </div>
  )
}

export default BookReviews