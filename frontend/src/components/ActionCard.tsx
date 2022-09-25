import { Card } from "react-bootstrap";
import { ActionCardI } from "../interfaces";

const ActionCard: React.FC<ActionCardI> = ({onClick, image, title, text}) => {

    return(
        <Card style={{ width: '15rem', height: '20rem' }}>
            <div className='zoom'>
                <Card.Link onClick={onClick}>
                    <Card.Img variant="top" src={image} />
                </Card.Link>
            </div>
            <Card.Body>
                <ul className="list-unstyled">
                    <Card.Title className='underline-on-hover'>
                        <Card.Link onClick={onClick} style={{ textDecoration: 'none' }}>
                            {title}
                        </Card.Link>
                    </Card.Title>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </ul>
            </Card.Body>
        </Card>
    )

}

export default ActionCard;