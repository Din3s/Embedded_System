/******************************************************************************
 * Copyright (C) 2017 by Alex Fosdick - University of Colorado
 *
 * Redistribution, modification or use of this software in source or binary
 * forms is permitted as long as the files maintain this copyright. Users are 
 * permitted to modify this and use it to learn about the field of embedded
 * software. Alex Fosdick and the University of Colorado are not liable for any
 * misuse of this material. 
 *
 *****************************************************************************/
/**
 * @file <Add File Name> 
 * @brief <Add Brief Description Here >
 *
 * <Add Extended Description Here>
 *
 * @author <Add FirsName LastName>
 * @date <Add date >
 *
 */



#include <stdio.h>
#include "stats.h"

/* Size of the Data Set */
#define SIZE (40)

void main() {

  unsigned char test[SIZE] = { 34, 201, 190, 154,   8, 194,   2,   6,
                              114, 88,   45,  76, 123,  87,  25,  23,
                              200, 122, 150, 90,   92,  87, 177, 244,
                              201,   6,  12,  60,   8,   2,   5,  67,
                                7,  87, 250, 230,  99,   3, 100,  90};

int mean=0;
printf("The eleemnts of array are:\n");
 print_array(SIZE,test);
sort_array(SIZE,test);
mean=find_mean(SIZE,test);
printf("\nThe mean value of array:%d\n",mean);
printf("\nThe sorted array is given:\n");
print_array(SIZE,test);
printf("\n");

//void print_statistics();

int Median;
Median= find_median(SIZE,test);
printf("\nThe median value of the element of an arrar:%d",Median);

int Max;
Max=find_maximum(SIZE,test);
printf("\nThe maximum value of element of an array:%d\n",Max);

//to find the minimum value of an array
int Min;
Min=find_minimum(SIZE,test);
printf("\nThe minimum element of an array :%d\n",Min);

}

int find_minimum(int x, unsigned char arr[]){
	int temp=arr[0];
	for(int i=1;i<x;i++){
	if(temp<arr[i])
	continue;
	else{
	temp=arr[i];	
	}	
	}
	return temp;

}


//function defination to find the median of an elements of an arry
int find_median(int x, unsigned char arr[]){
	int med_pos,med=0;
	med_pos=(x+1)/2;
	med=arr[med_pos];
	return med;
}


int find_maximum(int x, unsigned char arr[]){
	int temp;
	for(int i=0;i<40;i++){
	if(temp<arr[i])
	temp=arr[i];
}
	return temp;	
}

int find_mean(int x, unsigned char arr[]){
	int sum=0;
	for(int i=0;i<x;i++){
	sum+=arr[i];
	}
	return (sum/x);
}
// to print the element of array
void print_array(int x,unsigned char arr[]){
	for(int i=0;i<x;i++){
	printf("%d\t",arr[i]);		
	}	
}

void sort_array(int x, unsigned char arr[]){
	int temp=0;
	for(int j=0;j<x;j++){
	for (int i=0;i<x;i++){
	if(arr[i]>arr[j]){
	continue;
	}
	else{
	temp=arr[i];
	arr[i]=arr[j];
	arr[j]=temp;	
	}	
	}
	}
}

/* Add other Implementation File Code Here */
