using Machine.Specifications;
using TheGameOfLife.Server.Services;
using It = Machine.Specifications.It;

namespace TheGameOfLife.Specs
{
    public class When_Progressing_Forward_One_Generation
    {
        Establish context = () =>
        {
            inputs = new bool[][][]
            {
                new bool[][]
                {
                    new bool[]{false,false,false},
                    new bool[]{true, true, true },
                    new bool[]{false,false,false},
                },
                new bool[][]
                {
                    new []{false,false,false,false,false},
                    new []{false,true,true,true,false},
                    new []{false,true,false,true,false},
                    new []{false,true,true,true,false},
                    new []{false,false,false,false,false},
                },
                new bool[][]
                {
                    new []{true,false,false,false,false },
                    new []{false,true,false,false,false },
                    new []{false,false,true,false,false },
                    new []{false,false,false,true,false },
                    new []{false,false,false,false,true },
                },
                new bool[][]
                {
                    new []{false,false,false, false,false},
                    new []{true,true,true, false,false},
                    new []{false,false,false, false,false},
                    new []{false,false,false, false,false},
                    new []{false,false,false, false,false},
                }
            };
            expectations = new bool[][][]{
                new bool[][]
                {
                    new bool[]{ false,true,false },
                    new bool[]{ false,true,false },
                    new bool[]{ false,true,false }
                },
                new bool[][]{
                    new []{false,false,true,false,false },
                    new []{false,true,false,true,false},
                    new []{true,false,false,false,true},
                    new []{false,true,false,true,false},
                    new []{false,false,true,false,false },
                },
                new bool[][]
                {
                    new []{false,false,false,false,false},
                    new []{false,true,false,false,false },
                    new []{false,false,true,false,false },
                    new []{false,false,false,true,false },
                    new []{false,false,false,false,false },
                },
                new bool[][]
                {
                    new []{false,true,false, false,false},
                    new []{false,true,false, false,false},
                    new []{false,true,false, false,false},
                    new []{false,false,false, false,false},
                    new []{false,false,false, false,false},
                }
            };
            answers = new bool[expectations.Length][][];
            lifeService = new LifeService();
        };

        Because of = () =>
        {
            for (var i = 0; i < inputs.Length; i++)
            {
                answers[i] = lifeService.Proceed(inputs[i]);
            }
        };

        //It Should_Return_The_Correct_Jagged_Arrays = () => answers.ShouldEqual(expectations);

        It Should_Return_Next_Generation = () =>
        {
            for (var i = 0; i < answers.Length; i++)
            {
                for (var j = 0; j < answers[i].Length; j++)
                {
                    for (var k = 0; k < answers[i][j].Length; k++)
                    {
                        if (answers[i][j][k] != expectations[i][j][k])
                        {
                            var theAnswer = answers[i][j][k];
                            var theExpectation = expectations[i][j][k];
                        }
                        answers[i][j][k].ShouldEqual(expectations[i][j][k]);

                    }
                }
            }
        };
        private static bool[][][] inputs;
        private static bool[][][] expectations;
        private static bool[][][] answers;
        private static ILifeService lifeService;
    }

    public class When_Counting_Neighbors
    {
        Establish context = () =>
        {
            input = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false, false, false, false, false }
            };
            expect = new int[][]
            {
                new int[]{ 1,2,3,2,1 },
                new int[]{ 2,3,5,3,2 },
                new int[]{ 3,5,8,5,3 },
                new int[]{ 2,3,5,3,2 },
                new int[]{ 1,2,3,2,1 }
            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.CountNeighbors(input);

        //It Should_Return_A_Full_Jagged_Array = () => answer.ShouldEqual(expect);
        It Should_Return_A_Jagged_Array_Of_Ints = () =>
        {
            for (var i = 0; i < input.Length; i++)
            {
                for (var j = 0; j < input[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static bool[][] input;
        private static int[][] expect;
        private static ILifeService lifeService;
        private static int[][] answer;
    }

    public class When_Padding_Life
    {
        Establish context = () =>
        {
            input = new bool[][]
            {
                new bool[]{ true, true, true },
                new bool[]{ true, true, true },
                new bool[]{ true, true, true }
            };
            expect = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false, false, false, false, false }
            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.PadLife(input);

        It Should_Add_A_Layer_Of_False_Around_The_Outside = () =>
        {
            for (var i = 0; i < input.Length; i++)
            {
                for (var j = 0; j < input[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static bool[][] input;
        private static bool[][] expect;
        private static ILifeService lifeService;
        private static bool[][] answer;
    }

    public class When_Removing_Life_Padding_From_Top_And_Bottom
    {
        Establish context = () =>
        {
            input = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false, false, false, false, false }
            };
            expect = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.UnPadLifeVertical(input);

        //It Should_Return_Correct_Array = () => answer.ShouldEqual(expect);
        It Should_Remove_Outer_Layer_If_All_False = () =>
        {
            for (var i = 0; i < answer.Length; i++)
            {
                for (var j = 0; j < answer[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static bool[][] input;
        private static bool[][] expect;
        private static ILifeService lifeService;
        private static bool[][] answer;
    }

    public class When_Flipping_Rows_And_Columns
    {
        Establish context = () =>
        {
            input = new bool[][]
            {
                new bool[]{true,true,true,true,true },
                new bool[]{false, false ,false,false,false},
                new bool[]{true,true,true,true,true },
                new bool[]{false, false ,false,false,false},
                new bool[]{true,true,true,true,true }
            };
            expect = new bool[][]
            {
                new bool[]{true,false,true,false,true},
                new bool[]{true,false,true,false,true},
                new bool[]{true,false,true,false,true},
                new bool[]{true,false,true,false,true},
                new bool[]{true,false,true,false,true}

            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.FlipLife(input);

        It Should_Return_Flipped_Jagged_Array = () =>
        {
            for (var i = 0; i < input.Length; i++)
            {
                for (var j = 0; j < input[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static bool[][] input;
        private static bool[][] expect;
        private static ILifeService lifeService;
        private static bool[][] answer;
    }

    public class When_Removing_All_Life_Padding
    {
        Establish context = () =>
        {
            input = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false, false, false, false, false }
            };
            expect = new bool[][]
            {
                new bool[]{ true, true, true },
                new bool[]{ true, true, true },
                new bool[]{ true, true, true }
            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.UnPadLife(input);

        It Should_Remove_All_Padding = () =>
        {
            for (var i = 0; i < answer.Length; i++)
            {
                for (var j = 0; j < answer[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static bool[][] input;
        private static bool[][] expect;
        private static ILifeService lifeService;
        private static bool[][] answer;
    }

    public class When_Determining_Life_And_Death
    {
        Establish context = () =>
        {
            inputCount = new int[][]
            {
                new int[]{ 0,0,0,0,0 },
                new int[]{ 1,2,3,2,1 },
                new int[]{ 1,1,2,1,1 },
                new int[]{ 1,2,3,2,1 },
                new int[]{ 0,0,0,0,0 },
            };
            inputLife = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false, false, false, false, false },
                new bool[]{ false,  true,  true, true,  false },
                new bool[]{ false, false, false, false, false },
                new bool[]{ false, false, false, false, false }
            };
            expect = new bool[][]
            {
                new bool[]{ false, false, false, false, false },
                new bool[]{ false, false, true, false, false },
                new bool[]{ false, false, true, false, false },
                new bool[]{ false, false, true, false, false },
                new bool[]{ false, false, false, false, false },
            };
            lifeService = new LifeService();
        };

        Because of = () => answer = lifeService.DetermineLifeAndDeath(inputCount, inputLife);

        //It Should_Return_Next_Generation = () => answer.ShouldEqual(expect);
        It Should_Accurately_Determine_The_Next_Gen = () =>
        {
            for (var i = 0; i < answer.Length; i++)
            {
                for (var j = 0; j < answer[i].Length; j++)
                {
                    answer[i][j].ShouldEqual(expect[i][j]);
                }
            }
        };

        private static int[][] inputCount;
        private static bool[][] inputLife;
        private static bool[][] expect;
        private static ILifeService lifeService;
        private static bool[][] answer;
    }
}
