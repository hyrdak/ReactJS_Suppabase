import React, { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
  supabase: SupabaseClient;
  user: any;
}

const Header: React.FC<Props> = ({ supabase, user }) => {
    const [displayName, setDisplayName] = useState<string>("");
    const [flagDisplayName, setFlagDisplayName] = useState<boolean>(false);

  
    const signoutAction = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error:', error.message);
            }
            alert('Đăng xuất thành công!');
            window.location.href = '/signin';
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    };
  
    useEffect(() => {
      if(user !== '') {
        const fetchData = async () => {
          setDisplayName(user.user_metadata.display_name);
          setFlagDisplayName(true);
        };
        fetchData();
      }
    }, [user]);

    return (
        <div className='text-right mr-5 mt-2'>
          <div>
            {displayName && <span>Xin chào, {displayName}</span>}<br />
            {flagDisplayName && (
                <button
                    onClick={signoutAction}
                    className="inline-flex justify-center px-4 py-2 tracking-wide text-white bg-blue-500 rounded-lg h-[40px]"
                >
                    Đăng xuất
                </button>
            )}
            </div>
        </div>
    );
  
};

export default Header;