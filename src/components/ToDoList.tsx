import React, { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';


interface Props {
  supabase: SupabaseClient;
  user: any;
}

const ToDoList: React.FC<Props> = ({ supabase, user }) => {
  const [data, setData] = useState<any[]>([]);
  const [TextInput, setTextInput] = useState('');
  const [flag, setFlag] = useState(true);
  const [id_list, setid_list] = useState<number>(0);

  function ifTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  const fetchData = async () => {
    
    try {
      const { data, error } = await supabase
        .from('table_todolist')
        .select('*')
        .eq( 'id_User' , user.id );
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }

  };

  useEffect(() => {
    if(user !== '') {
      fetchData();
    }
  });

  //thêm
  const addList = async (val: String) => {
    if(user !== '') {
      setTextInput('');
      var e = 0;
      const runtime = (id: any) => { id > e && (e = id); };
      try {
        const { data, error } = await supabase
          .from('table_todolist')
          .select('*')
        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          data.forEach((item: any) => runtime(item.id));
        }
      } catch (error) {
        console.error('Error fetching data:', (error as Error).message);
      }
      e++;
      try {
        const { data, error } = await supabase
          .from('table_todolist')
          .insert([
            { id: e, name: val, status: false, star: false, id_User: user.id },
          ])
          .select();
        if (error) {
          console.error('Error:', error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
      fetchData();
    }
  }

  //sửa
  const updateList = async (val: String) => {
    setFlag(!flag);
    setTextInput('');
    try {
      const { data, error } = await supabase
      .from('table_todolist')
      .update({ name : val })
      .eq('id', id_list)
      .select();
      if (error) {
        console.error('Error:', error.message);
      } else {
        setData(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    fetchData();
  }

  //xóa
  const deleteFromID = async (itemId: number) => {
    try {
      const { error } = await supabase
        .from('table_todolist')
        .delete()
        .eq('id', itemId);
      if (error) {
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    fetchData();
  }

  //nút sửa
  const changeName = (itemId: any, newName: string) => {
    setFlag(!flag);
    setid_list(itemId);
    setTextInput(newName);
    fetchData();
  };

  //hủy sửa
  const changeNameCancel = () => {
    setFlag(!flag);
    setid_list(0);
    setTextInput('');
    
  };

  //check
  const check = (id:number) => {
    if(flag === false && id === id_list) {
      return false;
    }
    else {
      return true;
    }
  };


  
  return (
    <>
      <p className="mt-4 mb-2 text-xl text-center"><b>TodoApp</b></p>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10">
            <input
              type="text"
              value={TextInput}
              onChange={ifTextChange}
              className="w-[400px] px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Thêm việc cần làm..."
              aria-describedby="helpId"
            /><br/>
            <small id="helpId" className="text-gray-500">Tác vụ</small>
          </div>
          <div className="col-span-2 flex items-center">
            <button
              hidden={!flag}
              type="submit"
              disabled={!TextInput}
              onClick={() => addList(TextInput)}
              className="mb-6 w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >Thêm</button>
            <button
              hidden={flag}
              type="submit"
              disabled={!TextInput}
              onClick={() => updateList(TextInput)}
              className="mb-6 w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >Sửa</button>
          </div>
        </div>
      </div>

      <p className="mt-4 mb-2 text-xl text-center ">Dữ liệu từ Supabase</p>
      <ul className="justify-center grid">
        {data.slice().reverse().map((item: any) => (
          <li key={item.id} className="mb-2">

              <span>{item.name}</span>

              <button
                onClick={() => 1}
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >Xong</button>
              <button
                onClick={() => changeName(item.id, item.name)}
                hidden={!flag}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >Sửa</button>
              <button
                onClick={() => changeNameCancel()}
                hidden={check(item.id)}
                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >Hủy</button>
              <button
                onClick={() => deleteFromID(item.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >Xóa</button>

          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;