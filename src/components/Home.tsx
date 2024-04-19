import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <center style={{paddingTop:'200px', }}>
        <p className="mt-4 mb-2 text-xl text-center"><b>TodoApp</b></p>
        <p>Vui lòng <Link to="/signin" style={{ textDecoration: 'none' }}>
            <span className='text-blue-500'>đăng nhập</span></Link>
            <br/>
            hoặc <Link to="/signup" style={{ textDecoration: 'none' }}>
            <span className='text-blue-500'>đăng ký</span></Link> để tiếp tục</p>
        <Link to="/signin">
          <button 
            className="w-[125px] mt-5 inline-flex items-center justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[40px]"
          >Bắt đầu
          </button>
        </Link>
    </center>
  );
}