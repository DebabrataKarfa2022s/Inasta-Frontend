import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { SummaryApi } from '@/common/index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Searchbar = ({ open, setOpen }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        // Clear previous debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set new debounce timeout
        const timeout = setTimeout(() => {
            if (query.trim()) {
                fetchSearchResults();
            } else {
                setResults([]);
            }
        }, 300); // Adjust debounce time as needed (300 ms)

        setDebounceTimeout(timeout);

        // Cleanup timeout on component unmount or query change
        return () => clearTimeout(timeout);
    }, [query]);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${SummaryApi.searchUsers.url}?username=${encodeURIComponent(query)}`,{
                    withCredentials:true
                }
            );
            setResults(response.data.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogContent onInteractOutside={() => { setOpen(false); setQuery(''); setResults([]); }}>
                    <DialogTitle>Search People</DialogTitle>
                    <div className="max-w-lg mx-auto p-4">
                        <div className="mb-4 flex gap-4">
                            <Input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by username"
                                className="focus-visible:ring-transparent rounded max-w-60 border border-cyan-500"
                            />
                            <Button
                                type="button"
                                onClick={() => setQuery('')} // Clear the input and results
                                className="bg-blue-500 text-white hidden sm:block"
                            >
                                Clear
                            </Button>
                        </div>

                        {loading && <p>Loading...</p>}
                        {results && results.map((user) => (
                            <div key={user._id} className="flex items-center gap-4 my-2">
                                <Link to={`${user?._id}/profile`} onClick={() => { setOpen(false); setQuery(''); setResults([]); }} >
                                    <Avatar>
                                        <AvatarImage src={user.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <Link to={`${user?._id}/profile`} onClick={() => { setOpen(false); setQuery(''); setResults([]); }} >
                                    <span className="text-blue-500">
                                        {user.username}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Searchbar;


