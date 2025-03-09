
const algorithmSelector = document.getElementById('algorithm');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const barsContainer = document.getElementById('bars-container');

function generateArray()
{

    const array = [];
    const arraySize = 50;
    const maxBarHeight = 300;

    for(let i = 0; i < arraySize; i++)
    {
        const randomHeight = Math.floor(Math.random() * maxBarHeight) + 1;
        array.push(randomHeight);
    }

    displayArray(array);
}

function displayArray(array)
{
    barsContainer.innerHTML = '';

    array.forEach((height, index) => {
        const bar=document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${height}px`;
        bar.style.backgroundColor = 'blue';
        barsContainer.appendChild(bar);

});

}


generateButton.addEventListener('click', generateArray);
sortButton.addEventListener('click', sortArray);

async function bubbleSort(array)
{
    const n=array.length;

    for(let i=0; i<n; i++)
    {
        for(let j=0; j<n-i-1; j++)
        {
            const bar1 = barsContainer.children[j];
            const bar2= barsContainer.children[j+1];

            bar1.classList.add('comparing');
            bar2.classList.add('comparing');

            if(array[j] > array[j+1])
            {
                
                [array[j], array[j+1]] = [array[j+1], array[j]];
                await sleep(100);
                displayArray(array);
            }

            bar1.classList.remove('comparing');
            bar2.classList.remove('comparing');
    }
}

array.forEach((height, index) => {
    

barsContainer.children[index].classList.add('sorted');

});

}

async function selectionsort(array)
{

    const n=array.length;

    for(let i=0; i<n; i++)
    {
        let minIndex=i;

        for(let j=i+1; j<n; j++)
        {
            const bar1 = barsContainer.children[j];
            const bar2= barsContainer.children[minIndex];

            bar1.classList.add('comparing');
            bar2.classList.add('comparing');

            if(array[j] < array[minIndex])
            {
                minIndex=j;
            }

            await sleep(100);
            displayArray(array);

            bar1.classList.remove('comparing');
            bar2.classList.remove('comparing');
        }

        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    array.forEach((height, index) => {
        barsContainer.children[index].classList.add('sorted');
    });


}

async function Insertionsort(array)
{
    const n=array.length;

    for(let i=1; i<n; i++)
    {
        let current=array[i];
        let j=i-1;

        while(j>=0 && array[j] > current)
        {
            array[j+1]=array[j];
            j--;

            await sleep(100);
            displayArray(array);
        }

        array[j+1]=current;
    }

    array.forEach((height, index) => {
        barsContainer.children[index].classList.add('sorted');
    });

}

async function mergeSort(array,left,right)
{
    if(left<right)
    {
        const mid=Math.floor((left+right)/2);
        await mergeSort(array,left,mid);
        await mergeSort(array,mid+1,right);
        await merge(array,left,mid,right);
    }
}

async function merge(array,left,mid,right)
{
    const n1=mid-left+1;
    const n2=right-mid;

    const L=array.slice(left,left+n1);
    const R=array.slice(mid+1,mid+1+n2);

    let i=0,j=0,k=left;

    while(i<n1 && j<n2)
    {

        const bar1 = barsContainer.children[k];
        const bar2 = barsContainer.children[k+1];

        bar1.classList.add('comparing');
        bar2.classList.add('comparing');

        if(L[i]<=R[j])
        {
            array[k]=L[i];
            i++;
        }
        else
        {
            array[k]=R[j];
            j++;
        }

        await sleep(100);
        displayArray(array);

        bar1.classList.remove('comparing');
        bar2.classList.remove('comparing');
        k++;
    }

    while(i<n1)
    {
        array[k]=L[i];
        i++;
        k++;
    }

    while(j<n2)
    {
        array[k]=R[j];
        j++;
        k++;
    }

    await sleep(100);
    displayArray(array);
}

async function quickSort(array,left,right)
{
    if(left<right)
    {
        const pi=await partition(array,left,right);
        await quickSort(array,left,pi-1);
        await quickSort(array,pi+1,right);
    }
}

async function partition(array,left,right)
{

    const pivot=array[right];
    let i=left-1;

    for(let j=left; j<right; j++)
    {
        const bar1 = barsContainer.children[j];
        const bar2 = barsContainer.children[right];

        bar1.classList.add('comparing');
        bar2.classList.add('comparing');

        if(array[j]<pivot)
        {
            i++;
            [array[i],array[j]]=[array[j],array[i]];
            await sleep(100);
            displayArray(array);
        }

        bar1.classList.remove('comparing');
        bar2.classList.remove('comparing');
    }

    [array[i+1],array[right]]=[array[right],array[i+1]];
    await sleep(100);
    displayArray(array);

    return i+1;
}

async function heapsort(array,left,right)
{

    const n=array.length;

    for(let i=Math.floor(n/2)-1; i>=0; i--)
    {
        await heapify(array,n,i);
    }

    for(let i=n-1; i>0; i--)
    {
        [array[0],array[i]]=[array[i],array[0]];
        await heapify(array,i,0);
    }

    array.forEach((height, index) => {
        barsContainer.children[index].classList.add('sorted');
    });

    async function heapify(array,n,i)
    {
        let largest=i;
        let left=2*i+1;
        let right=2*i+2;

        if(left<n && array[left]>array[largest])
        {
            largest=left;
        }

        if(right<n && array[right]>array[largest])
        {
            largest=right;
        }

        if(largest!=i)
        {
            [array[i],array[largest]]=[array[largest],array[i]];
            await heapify(array,n,largest);
        }
    }
}

async function sortArray()
{
    const array = Array.from(barsContainer.children).map(bar => parseInt(bar.style.height));
    const algorithm = algorithmSelector.value;

   if(algorithm === 'bubble')
   {
       await bubbleSort(array);
   }
    else if(algorithm === 'selection')
    {
         await selectionsort(array);
    }
    else if(algorithm === 'insertion')
    {
         await Insertionsort(array);
    }
    else if(algorithm === 'merge')
    {
         await mergeSort(array,0,array.length-1);
    }
    else if(algorithm === 'quick')
    {
         await quickSort(array,0,array.length-1);
    }
    else if(algorithm === 'heap')
    {
         await heapsort(array);
    }

    array.forEach((height, index) => {
        barsContainer.children[index].classList.add('sorted');
    });
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}