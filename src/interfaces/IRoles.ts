export default interface IRoles {
  roleNumber: number;
  roleName: number;
}

/* const fetchCurrentUser = async () => {
    try {
      const response = await http.get(`/users/me`);
      setUser(response.data);
      setIsLoading(false);
      setIsStaff(response.data.roles.includes(1000) || response.data.roles.includes(2000) || response.data.roles.includes(3000));
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []); */