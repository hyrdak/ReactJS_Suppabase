import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import 'bootstrap/dist/css/bootstrap.min.css';


const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
const supabase = createClient(supabaseUrl, supabaseKey);

const ToDoList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [TextInput, setTextInput] = useState('');
  const [flag, setFlag] = useState(true);
  const [id_list, setid_list] = useState('');

  function ifTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('table_todolist')
        .select('*');
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
    fetchData();
  }, []);

  //thêm
  const addList = async (val: String) => {
    setTextInput('');
    var e = 0;
    const runtime = (id: any) => { id > e && (e = id); };
    data.forEach((item: any) => runtime(item.id));
    e++;
    try {
      const { data, error } = await supabase
        .from('table_todolist')
        .insert([
          { id: e, name: val, status: false, star: false },
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
  };

  //hủy sửa
  const changeNameCancel = () => {
    setFlag(!flag);
    setid_list('-1');
    setTextInput('');
  };

  return (
    <>
      <div className="container">
        <center className="form-control">
          <div className="row ">
            <div className="col-md-10">
              <input
                type="text"
                value={TextInput}
                onChange={ifTextChange}
                className="form-control"
                placeholder="Thêm việc cần làm..."
                aria-describedby="helpId" />
              <small id="helpId" className="text-muted">Tác vụ</small>
            </div>
            <div className="col-md-2">
              <div>
                <button
                  hidden={!flag}
                  type="button"
                  disabled={!TextInput}
                  onClick={() => addList(TextInput)}
                  className="btn btn-primary"
                >Thêm
                </button>
                <button
                  hidden={flag}
                  type="button"
                  disabled={!TextInput}
                  onClick={() => updateList(TextInput)}
                  className="btn btn-primary"
                >Sửa
                </button>
              </div>
            </div>
          </div>
        </center>
      </div>
      <h3>Dữ liệu từ Supabase</h3>
      <ul>
        {data.slice().reverse().map((item: any) => (
          <li key={item.id}>
            {item.name}
            <button 
              onClick={() => 1}
              >Xong
            </button>
            <button 
              onClick={() => changeName(item.id, item.name)}
              hidden={!flag}
              >Sửa
            </button>
            <button 
              onClick={() => changeNameCancel()}
              hidden={flag}
              >Hủy
            </button>
            <button 
              onClick={() => deleteFromID(item.id)}
              >Xóa
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;