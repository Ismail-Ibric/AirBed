import Image from "next/image";
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import StarIcon from "@heroicons/react/solid/StarIcon";
import React from "react";

class CardInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heart: false
    }
    this.toggleHeart = this.toggleHeart.bind(this);
  }

  componentDidMount() {
   // console.log("componentDidMount called");
  }

  componentDidUpdate() {
    //console.log("componentDidUpdate called");
  }

  // refresh = () => {
  //   // re-renders the component
  //   this.setState({});
  // };

  toggleHeart = () => {

    this.props.updateHearted(this.props.id, !this.state.heart);

    this.setState( (prevState) => (
      {heart: !this.state.heart}
    ));

    //this.refresh();
    
  };

  render() {
    return (
      //<button className="bg-red-300 p-2" onClick={ this.refresh }>Refresh Component</button>
      <div
        className="flex p-2 bg-white shadow-lg rounded-xl
        hover:opacity-90 hover:shadow-xl hover:scale-101 cursor-pointer
        transition duration-200 ease-out border border-gray-300"
        key={this.props.id}
      >        
        <div className="relative flex-shrink-0 h-24 w-40 md:h-52 md:w-80">
          <Image
            src={this.props.record.img ? this.props.record.img : this.props.record.altimg}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p className="text-xs text-gray-200">{this.props.record.loc}</p>
            {this.props.getIsHearted(this.props.id) ?
              <HeartIcon id={'heart'+this.props.id} className="cursor-pointer h-7 text-red-400
              hover:scale-105 hover:text-red-500 active:scale-100"
              onClick={this.toggleHeart} /> :
              <HeartIcon id={'heart'+this.props.id} className="cursor-pointer h-7 text-gray-400
                hover:scale-105 hover:text-gray-500 active:scale-100"
                onClick={this.toggleHeart} />
            }
            
          </div>
          <h4 className="text-xl">{this.props.record.title.substring(0, 50)}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500 flex-grow">{this.props.record.desc}</p>
          <div className="flex justify-between items-end pt-5">
            <p className="flex">
              {/* <StarIcon className="h-5 text-red-400 flex-grow" />
              {this.props.record.review_scores_rating} */}
            </p>
            <div>
              <p className="text-lg lg:text-2xl">{this.props.record.country === "GB" ? "£" : "$" }{`${this.props.record.price}`}</p>
              <p className="text-sm text-right">{this.props.record.total}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardInfo;