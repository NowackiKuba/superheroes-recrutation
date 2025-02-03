import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import axios from 'axios';
import { Superhero } from './types';
import { Button } from './components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { useToast } from './hooks/use-toast';
import { useState } from 'react';
import { Skeleton } from './components/ui/skeleton';

function App() {
  /**
   * Main application component that displays and manages superheroes.
   * Features:
   * - Display superheroes in a sorted table
   * - Add new superheroes via modal form
   * - Real-time updates using React Query
   */

  /**
   * Query hook to fetch superheroes from the API
   * Automatically handles caching and refetching
   */
  const { data: heroes, isLoading } = useQuery({
    queryKey: ['getSuperheroes'],
    queryFn: async (): Promise<Superhero[]> => (await axios(`http://localhost:3000/superheroes`, { method: 'GET', withCredentials: true })).data,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [heroName, setHeroName] = useState<string>('');
  const [superpower, setSuperpower] = useState<string>('');
  const [humility, setHumility] = useState<number>(0);

  /**
   * Mutation hook to create new superheroes
   * Handles success/error states and displays toast notifications
   */
  const { mutate: createSuperheroMutation, isPending } = useMutation({
    mutationKey: ['createSuperhero'],
    mutationFn: async (superhero: Superhero) =>
      (await axios(`http://localhost:3000/superheroes`, { method: 'POST', data: superhero, withCredentials: true })).data,

    onSuccess: () => {
      toast({
        title: 'Superhero Created',
        description: 'Your superhero has been created successfully.',
        duration: 3000,
      });
      queryClient.invalidateQueries({
        queryKey: ['getSuperheroes'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      toast({
        title: 'Superhero Creation Failed',
        description: error?.message ?? 'An error occurred while creating your superhero.',
        duration: 3000,
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className='w-full h-screen py-12 text-white px-36'>
        <Skeleton className='w-full h-[550px] rounded-3xl' />
      </div>
    );
  }

  return (
    <div className='w-full h-screen py-12 text-white px-36'>
      <div className='w-full h-[550px] flex flex-col p-6 rounded-3xl border border-border bg-secondary shadow-md gap-4'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-2xl font-bold'>Your Superheroes</p>
          <Dialog>
            <DialogTrigger>
              <Button size={'icon'} variant={'outline'}>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col w-full max-w-2xl gap-6'>
              <DialogTitle className='text-2xl font-bold'>Create Superhero</DialogTitle>
              <div className='flex flex-col w-full gap-4'>
                <div className='flex flex-col items-start gap-1'>
                  <Label>Name</Label>
                  <Input onChange={(e) => setHeroName(e.target.value)} />
                </div>
                <div className='flex flex-col items-start gap-1'>
                  <Label>Superpower</Label>
                  <Input onChange={(e) => setSuperpower(e.target.value)} />
                </div>
                <div className='flex flex-col items-start gap-1'>
                  <Label>Humility</Label>
                  <Input type='number' onChange={(e) => setHumility(parseInt(e.target.value))} />
                </div>
                <DialogClose>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      createSuperheroMutation({
                        humility,
                        name: heroName,
                        superpower,
                      });
                    }}
                    className='flex items-center gap-2'
                  >
                    {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
                    Create Superhero
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Superpowers</TableHead>
              <TableHead>Humility</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroes?.map((hero, index) => (
              <TableRow key={`${hero.name}-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{hero.name}</TableCell>
                <TableCell>{hero.superpower}</TableCell>
                <TableCell>{hero.humility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
