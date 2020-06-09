import React, { Component } from "react";
import "./loginStyle.css";
import Google from "../../images/google.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>
       <form >
        <table align="center" style={{width:"200px", marginTop:"100px"}}>
          <tbody>
          <tr>
            <td><div style={{border:"1px solid lightgray", width:"100px", height:"100px", margin:"0 auto"}}>로고</div></td>
          </tr>
          <tr>
            <td><span style={{float:"right", marginTop: "8px"}}>
              <input type="checkbox"  style={{width:"13px", height:"13px"}}/><span style={{marginLeft:"5px", fontWeight:"normal", fontSize:"13px", marginBottom:"10px"}}>로그인 상태 유지</span></span><br/>
            <input type="text" className="form-control" placeholder="EAMIL" style={{width:"250px", height:"50px", fontWeight:"normal", outline:"none", fontSize:"13px"}}/></td>
          </tr>
          <tr>
            <td>
            <input type="password" className="form-control" placeholder="PASSWORD" style={{width:"250px", outline:"none", height:"50px", fontWeight:"normal", fontSize:"13px"}}/></td>
          </tr>
          <tr>
            <td style={{paddingTop:"10px"}}><span style={{marginLeft:"5px", fontWeight:"normal", fontSize:"10px"}}>비밀번호를 잊으셨나요?</span>
            <button type="button" className="btn btn-md" style={{width:"80px", height:"20px", fontSize:"10px", padding:"0", lineHeight:"10px", float:"right"}}>비밀번호 찾기</button><br/></td>
          </tr>
          <tr>
            <td style={{textAlign:"center"}}><br/><button type="submit" className="btn" style={{backgroundColor:"lightgray", height:"30px"}}>로그인</button></td>
          </tr>
          <tr>
            <td style={{textAlign:"center"}}><br/><button type="button" className="btn" style={{borderRadius:"100%", border:"1px solid lightgray", width:"50px", height:"50px", backgroundColor:"white"}}>
              <img src={Google} style={{textAlign:"center", width:"25px", height:"25px"}}alt=""/></button>&nbsp;&nbsp;
              <button type="button" className="btn" style={{borderRadius:"100%", border:"1px solid lightgray", width:"50px", height:"50px", backgroundColor:"white"}}>
              <img src={Google} style={{textAlign:"center", width:"25px", height:"25px"}}alt=""/></button></td>
         </tr>
         </tbody>
        </table>
      </form>


    </div>;
  }
}

export default Login;
