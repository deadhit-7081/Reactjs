import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
class DishDetail extends Component
{
    renderDish(dish)
        {
          if(dish == null)
          {
            return <div></div>
          }
          else
          {
            return(
                <div class="col-12 col-md-5 m-1">
                        <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                        </Card>
              </div>
            )
          }
        }
        renderComments(dish) 
        {
            if (dish == null) 
            {
                return (<div></div>)
            }
            const cmnts = dish.map(comment => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(comment.date))}
                        </p>
                    </li>
                )
            })
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {cmnts}
                    </ul>
                </div>
            )
        }
    render()
    {
        const a=this.props.ddetail
        if(a==null)
        {
            return <div></div>
        }
        const dishItem=this.renderDish(a)
        const comment=this.renderComments(a.comments)
        return(
            <div className="container">
                <div className="row">
                    {dishItem}
                    {comment}
                </div>
            </div>
        )
    }
}
export default DishDetail;