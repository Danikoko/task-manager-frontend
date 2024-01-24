import Swal from 'sweetalert2';

const constants = {
    API_URL: <string>'http://127.0.0.1:8000/api/',
    MEDIA_URL: <string>'http://127.0.0.1:8000/',
    CURRENT_HOST_URL: <string>'http://localhost:5173',
    getDateAndTime: (inputDateString: string) => {
        // Create a Date object from the input string
        const inputDate = new Date(inputDateString);

        // Define months and AM/PM
        const months = [
            '01', '02', '03', '04', '05', '06',
            '07', '08', '09', '10', '11', '12'
        ];

        // Convert hours to 12-hour format
        const hours = inputDate.getHours() % 12 || 12;
        const ampm = inputDate.getHours() >= 12 ? 'PM' : 'AM';

        // Format the date components
        const formattedDate = `${inputDate.getDate()}/${months[inputDate.getMonth()]}/${inputDate.getFullYear()} ${String(hours).padStart(2, '0')}:${String(inputDate.getMinutes()).padStart(2, '0')}${ampm}`;

        return formattedDate;
    },
    successAlert: async (message: string): Promise<void> => {
        await Swal.fire({
            title: 'Great!',
            text: message,
            icon: 'success'
        });
    },
    errorAlert: async (message: string): Promise<void> => {
        await Swal.fire({
            title: 'Oops!',
            text: message,
            icon: 'error'
        });
    },
    badInternetAlert: async (): Promise<void> => {
        await Swal.fire({
            title: 'Oops!',
            text: 'Please check your internet connection and try again.',
            icon: 'error'
        });
    },
    confirmationAlert: async (message: string, confirmButtonText: string) => {
        let isConfirmed: boolean = false;
        await Swal.fire({
            title: message,
            showCancelButton: true,
            confirmButtonText,
            // confirmButtonColor: '#002979',
        }).then(result => {
            isConfirmed = result.isConfirmed
        });
        return isConfirmed;
    }
}

export default constants;