import React, { Component } from "react";
import Axios from "axios";

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      nickname:"",
      password:""
    }
   
  }
  componentWillMount(){
    this.showMain();
}
  showMain=()=>{
    console.log("show main");
    const url="http://localhost:9000/mechelin/";
    Axios.get(url).then((res)=>{
          console.log("show main 호출 성공"); 
          this.setState({
            email:res.data
          })       
    }).catch((error)=>{
        console.log("main 출력 에러:"+error);
    });
}
  onSendUserInform=(e)=>{
    console.log("insert userInform");
    const url="http://localhost:9000/mechelin/join.do";
    Axios.post(url,{email:e.email,nickname:e.nickname, password:e.password})
    .then((res)=>{
      this.showMain();
    }).catch((err)=>{
      console.log("insert userInfom error:"+err);
    });
  }

  render() {
    return <div>
      {/* <form onSubmit={this.onSendUserInform.bind(this)}>
        <table  align="center" style={{width:"200px", marginTop:"100px"}}>
          <tbody>
          <tr>
            <td><div style={{border:"1px solid lightgray", width:"100px", height:"100px", margin:"0 auto"}}>로고</div><br/></td>
          </tr>
          <tr>
            <td><input type="text" className="form-control" name="email" placeholder="EMAIL" style={{width:"250px", outline:"none", height:"50px", fontWeight:"normal", fontSize:"13px"}}/><br/>
           <button type="button" className="btn" style={{backgroundColor:"white", border:"1px solid rgba(245,145,45)", color:"#999", width:"250px", height:"40px"}}>인증하기</button></td>
          </tr>
          <tr>
            <td><br/><input type="text" className="form-control" name="nickname" placeholder="NICKNAME" style={{width:"250px", outline:"none", height:"50px", fontWeight:"normal", fontSize:"13px"}}/><br/></td>
          </tr>
          <tr>
            <td><input type="password" className="form-control" name="password" placeholder="PASSWORD" style={{width:"250px", outline:"none", height:"50px", fontWeight:"normal", fontSize:"13px"}}/><br/></td>
          </tr>
          <tr>
            <td><input type="password" className="form-control" placeholder="PASSWORD" style={{width:"250px", outline:"none", height:"50px", fontWeight:"normal", fontSize:"13px"}}/><br/></td>
          </tr>
          <tr>
            <td style={{textAlign:"center"}}><button type="submit" className="btn" style={{backgroundColor:"rgba(245,145,45)", color:"white", width:"250px", height:"40px"}}>회원가입</button></td>
          </tr>
          </tbody>
        </table>
      </form> */}
        {this.state.eamil}
    </div>;
  }
}
